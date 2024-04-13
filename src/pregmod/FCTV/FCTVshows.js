// cSpell:ignore sheedsh, Bugsh, lolimommy, rawr, Slooty, Arcol-O-gies, diss..., licky, milkies, breastgasms, Iluvutu, Viklanders, looove, Thurrr.. shty, Enthing, Ethrything, Arghhhh, Yershhhhh
// cSpell:ignore doin', holdin', comin', goin', hafta, concludin', keepin', headin', trustin'

/** @type {{[key: string]: App.Entity.SlaveState}} */
App.Data.FCTV.actors = {
	get millie() {
		const slave = BaseSlave();
		slave.devotion = 100;
		slave.trust = 100;
		slave.weight = 120;
		slave.boobs = 5000;
		slave.hips = 2;
		slave.butt = 5;
		slave.hLength = 50;
		slave.skin = "dark olive";
		slave.hStyle = "luxurious";
		slave.hColor = "strawberry-blonde";
		slave.clothes = "a leotard";
		return slave;
	},
	get millieBreeder() {
		const slave = App.Data.FCTV.actors.millie;
		slave.devotion = 0;
		slave.trust = 0;
		slave.boobs = 700;
		slave.hips = 2;
		slave.butt = 5;
		slave.hLength = 50;
		slave.hStyle = "luxurious";
		slave.hColor = "blonde";
		slave.boobShape = "perky";
		slave.belly = 10000;
		slave.preg = 35;
		slave.clothes = "a maternity dress";
		return slave;
	},
	get kirk() {
		const slave = BaseSlave();
		slave.actualAge = 44;
		slave.devotion = 0;
		slave.trust = 0;
		slave.muscles = 60;
		slave.weight = 30;
		slave.waist = 90;
		slave.boobs = 10;
		slave.shoulders = 3;
		slave.butt = 0;
		slave.hips = -1;
		slave.hLength = 10;
		slave.hColor = "dark brown";
		slave.faceShape = "masculine";
		slave.hStyle = "messy";
		slave.eyewear = "glasses";
		slave.clothes = "conservative clothing";
		slave.shoes = "flats";
		return slave;
	},
	get jules() {
		const slave = BaseSlave();
		slave.devotion = 0;
		slave.trust = 0;
		slave.weight = 30;
		slave.waist = 30;
		slave.boobs = 700;
		slave.butt = 3;
		slave.hLength = 50;
		slave.hStyle = "luxurious";
		slave.hColor = "auburn";
		slave.boobShape = "perky";
		slave.clothes = "panties and pasties";
		slave.collar = "stylish leather";
		return slave;
	},
	get red() {
		const slave = BaseSlave();
		slave.devotion = -90;
		slave.trust = 0;
		slave.face = -20;
		slave.hLength = 50;
		slave.hStyle = "messy";
		slave.hColor = "blazing red";
		slave.underArmHStyle = "bushy";
		slave.underArmHColor = "blazing red";
		slave.height = 150;
		slave.boobs = 700;
		slave.boobShape = "perky";
		slave.shoulders = 0;
		slave.waist = 180;
		slave.butt = 3;
		slave.hips = 3;
		slave.clothes = "spats and a tank top";
		slave.shoes = "flats";
		return slave;
	},
	get twin() {
		const slave = BaseSlave();
		slave.devotion = 0;
		slave.trust = 0;
		slave.muscles = 60;
		slave.boobs = 700;
		slave.butt = 3;
		slave.hLength = 50;
		slave.skin = "tan";
		slave.hStyle = "messy";
		slave.hColor = "blonde";
		slave.boobShape = "perky";
		return slave;
	},
	get premiumVirgin() {
		let slave = GenerateNewSlave("XX", {
			disableDisability: 1, minAge: (V.fertilityAge + 2), maxAge: 18, ageOverridesPedoMode: 1
		});
		slave.devotion = jsRandom(60, 90);
		slave.weight = jsRandom(-10, 10);
		slave.waist = jsRandom(-45, 25);
		slave.face = jsRandom(70, 100);
		slave.anus = 0;
		slave.vagina = 0;
		slave.trueVirgin = 1;
		slave.boobs = jsRandom(14, 26) * 50;
		slave.natural.boobs = slave.boobs - 300;
		slave.boobShape = "perky";
		slave.hips = 2;
		slave.butt = jsRandom(5, 6);
		slave.shoulders = 1;
		slave.preg = 0;
		slave.ovaries = 1;
		slave.teeth = "normal";
		slave.vaginaLube = 2;
		slave.energy = jsRandom(65, 95);
		slave.attrXY = jsRandom(70, 100);
		slave.attrXX = jsRandom(60, 90);
		slave.attrKnown = 1;
		slave.fetishKnown = 1;
		slave.lips = jsRandom(20, 50);
		slave.fetish = either("cumslut", "cumslut", "humiliation", "pregnancy", "pregnancy", "pregnancy", "submissive");
		slave.behavioralQuirk = either("advocate", "funny", "insecure", "none", "none");
		slave.sexualQuirk = either("caring", "none", "romantic");
		slave.fetishStrength = jsRandom(70, 100);
		slave.sexualFlaw = "none";
		slave.behavioralFlaw = "none";
		slave.intelligence = jsRandom(51, 70);
		slave.intelligenceImplant = 30;
		slave.trust = jsRandom(50, 80);

		slave.custom.tattoo = "$He has a small stylized 'A' tattooed on the nape of $his neck marking $him as the product of the famous breeding program at Arcturus Arcology.";
		slave.skill.vaginal = 0;
		slave.skill.entertainment = jsRandom(50, 80);
		slave.skill.oral = jsRandom(20, 60);
		slave.skill.anal = 0;
		slave.skill.whoring = 0;
		slave = FCTV.FinalTouches(slave);
		return slave;
	},
	get hyperPregnant() {
		let slave = GenerateNewSlave("XX", {
			disableDisability: 1, minAge: (V.fertilityAge + 3), maxAge: 20, ageOverridesPedoMode: 1
		});
		slave.weight = jsRandom(10, 20);
		slave.waist = jsRandom(-25, 25);
		slave.anus = 1;
		slave.vagina = 2;
		slave.preg = jsRandom(25, 30);
		slave.pregKnown = 1;
		slave.pregAdaptation = 300;
		slave.lips = jsRandom(20, 50);
		slave.teeth = "normal";
		slave.vaginaLube = 2;
		slave.boobs = jsRandom(10, 30) * 50;
		slave.lactation = 1;
		slave.lactationDuration = 2;
		slave.hips = 3;
		slave.hipsImplant = 1;
		slave.butt = jsRandom(7, 9);
		slave.attrKnown = 1;
		slave.energy = jsRandom(65, 100);
		slave.attrXY = jsRandom(40, 100);
		slave.devotion = jsRandom(40, 70);
		slave.trust = jsRandom(40, 70);
		slave.fetish = "pregnancy";
		slave.fetishKnown = 1;
		slave.fetishStrength = 100;
		slave.sexualFlaw = "breeder";
		slave.behavioralFlaw = "none";
		slave.behavioralQuirk = "none";
		slave.sexualQuirk = either("caring", "caring", "romantic");
		slave.intelligence = jsRandom(-15, 80);
		slave.intelligenceImplant = 15;
		if (V.seeHyperPreg === 0) {
			slave.pregType = either(6, 7, 7, 8);
		} else {
			slave.pregType = jsRandom(10, 16);
		}
		slave.pregWeek = slave.preg;
		SetBellySize(slave);

		slave.skill.vaginal = jsRandom(50, 80);
		slave.skill.oral = jsRandom(40, 80);
		slave.skill.anal = jsRandom(20, 50);
		slave.skill.whoring = jsRandom(0, 50);
		slave = FCTV.FinalTouches(slave);
		return slave;
	},
	get superfetation() { // superfetation
		let slave = GenerateNewSlave("XX", {
			disableDisability: 1, minAge: (V.fertilityAge + 4), maxAge: 24, ageOverridesPedoMode: 1
		});

		slave.weight = jsRandom(20, 40);
		slave.waist = jsRandom(-25, 25);
		slave.boobs = jsRandom(4, 6) * 100;
		slave.butt = jsRandom(3, 5);
		slave.hips = 1;
		slave.face = jsRandom(60, 90);
		slave.anus = 1;
		slave.vagina = 3;
		slave.preg = 0;
		slave.pregWeek = -2;
		slave.bellySag = 1;
		slave.bellySagPreg = 1;
		slave.teeth = "normal";
		slave.vaginaLube = 2;
		slave.energy = jsRandom(60, 90);
		slave.attrXY = jsRandom(60, 100);
		slave.attrXX = jsRandom(40, 65);
		slave.attrKnown = 1;
		slave.fetishKnown = 1;
		slave.sexualQuirk = "none";
		slave.fetish = either("cumslut", "humiliation", "pregnancy", "pregnancy", "submissive");
		slave.fetishStrength = jsRandom(70, 100);
		slave.sexualFlaw = "none";
		slave.behavioralFlaw = "none";
		slave.behavioralQuirk = "none";
		slave.intelligence = jsRandom(-15, 80);
		slave.intelligenceImplant = 0;
		slave.devotion = jsRandom(60, 90);
		slave.trust = jsRandom(50, 80);
		slave.geneticQuirks.superfetation = 2;

		slave.skill.vaginal = jsRandom(50, 100);
		slave.skill.oral = jsRandom(20, 50);
		slave.skill.anal = jsRandom(10, 20);
		slave.counter.birthsTotal = jsRandom(2, 3);
		slave = FCTV.FinalTouches(slave);
		return slave;
	},
	get MILF() { // MILF
		let slave = GenerateNewSlave("XX", {
			disableDisability: 1, minAge: 36, maxAge: 40, ageOverridesPedoMode: 1
		});
		slave.weight = jsRandom(20, 90);
		slave.waist = jsRandom(-45, 45);
		slave.boobs = jsRandom(20, 30) * 50;
		slave.natural.boobs = 850;
		slave.butt = jsRandom(5, 7);
		slave.hips = 2;
		slave.face = jsRandom(60, 90);
		slave.anus = 1;
		slave.vagina = 2;
		slave.preg = 0;
		slave.teeth = "normal";
		slave.vaginaLube = 2;
		slave.energy = jsRandom(60, 90);
		slave.attrXY = jsRandom(60, 100);
		slave.attrXX = jsRandom(40, 85);
		slave.attrKnown = 1;
		slave.fetishKnown = 1;
		slave.fetish = either("buttslut", "buttslut", "cumslut", "cumslut", "humiliation", "pregnancy", "pregnancy", "submissive");
		slave.fetishStrength = jsRandom(70, 100);
		slave.sexualFlaw = "none";
		slave.behavioralFlaw = "none";
		slave.behavioralQuirk = "none";
		slave.sexualQuirk = "none";
		slave.intelligence = jsRandom(-15, 80);
		slave.intelligenceImplant = 15;
		slave.devotion = jsRandom(60, 90);
		slave.trust = jsRandom(50, 80);
		slave.skill.vaginal = jsRandom(50, 100);
		slave.skill.entertainment = jsRandom(20, 80);
		slave.skill.oral = jsRandom(50, 100);
		slave.skill.anal = jsRandom(20, 80);
		slave.skill.whoring = jsRandom(20, 80);
		slave.counter.birthsTotal = jsRandom(1, 3);
		slave = FCTV.FinalTouches(slave);
		return slave;
	},
	get youngHottie() { // discount young hottie
		let slave = GenerateNewSlave("XX", {disableDisability: 1, maxAge: 25, ageOverridesPedoMode: 1});

		slave.face = jsRandom(70, 100);
		slave.weight = jsRandom(-5, 10);
		slave.waist = jsRandom(-45, 25);
		slave.anus = 1;
		slave.vagina = 1;
		slave.boobs = jsRandom(14, 26) * 50;
		slave.boobShape = "perky";
		slave.hips = 2;
		slave.butt = jsRandom(5, 6);
		slave.shoulders = -1;
		slave.preg = 0;
		slave.lips = jsRandom(25, 50);
		slave.vaginaLube = 2;
		slave.sexualFlaw = either("hates anal", "hates oral", "hates penetration", "idealistic");
		slave.behavioralFlaw = either("arrogant", "bitchy", "hates men");
		slave.energy = 10;
		slave.fetish = "none";
		slave.clit = either(3, 3, 4, 4, 5);
		slave.muscles = jsRandom(0, 25);
		slave.devotion = jsRandom(-25, 25);
		slave.trust = jsRandom(-25, 25);
		if (slave.physicalAge >= 12) {
			slave.teeth = "normal";
		}
		slave.skill.vaginal = 15;
		slave.skill.oral = 15;
		slave.skill.anal = 15;
		slave.skill.whoring = 15;
		slave = FCTV.FinalTouches(slave);
		return slave;
	},
	get hugeBalls() { // huge balls
		let slave = GenerateNewSlave("XY", {disableDisability: 1, maxAge: 25, ageOverridesPedoMode: 1});

		slave.anus = 2;
		slave.balls = jsRandom(20, 35);
		slave.dick = jsRandom(3, 5);
		slave.prostate = 2;
		slave.devotion = jsRandom(50, 80);
		slave.trust = jsRandom(50, 80);
		slave.scrotum = slave.balls;
		slave.skill.oral = jsRandom(30, 60);
		slave.skill.penetrative = jsRandom(0, 50);
		slave.skill.anal = jsRandom(20, 50);
		slave.skill.whoring = jsRandom(0, 25);
		slave = FCTV.FinalTouches(slave);
		return slave;
	},
	get mpreg() { // mpreg dickgirl
		let slave = GenerateNewSlave("XY", {disableDisability: 1, maxAge: 22, ageOverridesPedoMode: 1});
		slave.anus = 2;
		slave.vagina = 1;
		slave.ovaries = 0;
		slave.mpreg = 1;
		slave.preg = 0;
		slave.dick = jsRandom(3, 5);
		slave.balls = jsRandom(3, 6);
		slave.muscles = either(20, 50);
		slave.energy = jsRandom(70, 100);
		slave.attrXY = jsRandom(70, 100);
		slave.attrXX = jsRandom(70, 100);
		slave.attrKnown = 1;
		slave.fetishKnown = 1;
		slave.fetish = "pregnancy";
		slave.fetishStrength = jsRandom(80, 100);
		slave.sexualFlaw = "none";
		slave.behavioralFlaw = "none";
		slave.behavioralQuirk = "none";
		slave.sexualQuirk = "none";
		slave.intelligence = jsRandom(-15, 80);
		slave.intelligenceImplant = 15;
		slave.devotion = jsRandom(60, 90);
		slave.trust = jsRandom(50, 80);
		slave.skill.oral = jsRandom(40, 80);
		slave.skill.penetrative = jsRandom(0, 20);
		slave.skill.anal = jsRandom(40, 80);
		slave.skill.whoring = jsRandom(40, 70);
		slave = FCTV.FinalTouches(slave);
		return slave;
	},
	get FSmodel() {
		const slave = BaseSlave();
		slave.devotion = 0;
		slave.trust = 0;
		slave.hLength = 50;
		slave.hStyle = "neat";
		slave.hColor = "brown";
		slave.boobs = 700;
		slave.boobShape = "perky";
		slave.waist = 180;
		slave.butt = 3;
		slave.hips = 3;
		slave.clothes = "conservative clothing";
		slave.shoes = "flats";
		return slave;
	},
	get mindy() {
		const slave = GenerateNewSlave("XX");
		slave.devotion = 100;
		slave.trust = 100;
		slave.hLength = 50;
		slave.hStyle = "luxurious";
		slave.hColor = "strawberry-blonde";
		slave.boobs = 1400;
		slave.nipples = "huge";
		slave.boobShape = "perky";
		slave.areolae = 4;
		slave.waist = 180;
		slave.butt = 3;
		slave.hips = 3;
		slave.clothes = "a string bikini";
		return slave;
	},
	get mindyBloated() {
		const slave = GenerateNewSlave("XX");
		slave.devotion = 100;
		slave.trust = 100;
		slave.hLength = 50;
		slave.hStyle = "luxurious";
		slave.hColor = "strawberry-blonde";
		slave.boobs = 1400;
		slave.nipples = "huge";
		slave.boobShape = "perky";
		slave.areolae = 4;
		slave.waist = 180;
		slave.butt = 3;
		slave.hips = 3;
		slave.clothes = "a string bikini";
		slave.inflation = 2;
		slave.inflationType = "milk";
		slave.inflationMethod = 1;
		SetBellySize(slave);
		return slave;
	},
	get mike() {
		const slave = GenerateNewSlave("XY");
		slave.dick = 7;
		slave.faceShape = "masculine";
		slave.boobs = 10;
		slave.hLength = 10;
		slave.hColor = "dark brown";
		slave.clothes = "sport shorts";
		return slave;
	},
	get hostess() {
		const gender = (V.seeDicks === 100) ? "XY" : "XX";
		const slave = GenerateNewSlave(gender, {
			ageOverridesPedoMode: 1, disableDisability: 1, minAge: 25, maxAge: 35, race: "nonslave"
		});
		slave.devotion = 45;
		slave.trust = 55;
		slave.muscles = 60;
		slave.hLength = 40;
		slave.hColor = "brown";
		slave.hStyle = "luxurious";
		slave.clothes = "a halter top dress";
		slave.shoes = "heels";

		slave.behavioralFlaw = "arrogant";
		slave.markings = "none";
		if (slave.weight > 130) {
			slave.weight -= 100;
			slave.waist = random(-10, 50);
		}
		slave.health.condition = random(60, 80);
		return slave;
	},
	get scientist() {
		const gender = (V.seeDicks === 0) ? "XY" : "XX";
		const slave = GenerateNewSlave(gender, {
			ageOverridesPedoMode: 1, disableDisability: 1, minAge: 25, maxAge: 35, race: "nonslave"
		});

		slave.devotion = 0;
		slave.trust = 0;
		slave.muscles = 60;
		slave.boobs = 100;
		slave.butt = 0;
		slave.hLength = 10;
		slave.hStyle = "messy";
		slave.eyewear = "glasses";
		slave.clothes = "conservative clothing";
		slave.shoes = "flats";

		slave.behavioralFlaw = "arrogant";
		slave.markings = "none";
		if (slave.weight > 130) {
			slave.weight -= 100;
			slave.waist = random(-10, 50);
		}
		slave.health.condition = random(60, 80);
		return slave;
	},
	get nun() {
		const gender = (V.seeDicks === 100) ? "XY" : "XX";
		const slave = GenerateNewSlave(gender, {
			ageOverridesPedoMode: 1, disableDisability: 1, minAge: 25, maxAge: 35, race: "nonslave"
		});

		slave.devotion = jsRandom(45, 60);
		slave.trust = jsRandom(-10, 0);
		slave.muscles = 30;
		slave.hLength = 1;
		slave.hStyle = "buzzcut";
		slave.clothes = "a penitent nuns habit";

		slave.behavioralFlaw = "arrogant";
		slave.markings = "none";
		if (slave.weight > 130) {
			slave.weight -= 100;
			slave.waist = random(-10, 50);
		}
		slave.health.condition = random(60, 80);
		return slave;
	},
	get littleCloud() {
		const slave = BaseSlave();
		slave.devotion = 0;
		slave.trust = 100;
		slave.weight = -20;
		slave.boobs = 300;
		slave.hips = 0;
		slave.butt = 1;
		slave.hLength = 50;
		slave.skin = "very fair";
		slave.hStyle = "braided";
		slave.hColor = "black";
		slave.eyebrowHColor = slave.hColor;
		slave.clothes = "shibari ropes";
		return slave;
	}
};

/**
 * @typedef {object} FctvChannel
 * @property {FctvTags} [tags]
 * @property {boolean} [disableSelection]
 * @property {boolean} loop After an initial viewing, should the episodes continue to play in order?
 * @property {string} [intro]
 * @property {FctvEpisode[]} episode
 * @property {function(App.Entity.SlaveState, number):string | Node} [outro] Takes slave and episode number
 */

/**
 * @typedef {object} FctvEpisode
 * @property {FctvTags} [tags]
 * @property {App.Entity.SlaveState[]} [slaves]
 * @property {(function(App.Entity.SlaveState):string) | string} text HTML embedded
 */

/**
 * @typedef {object} FctvTags
 * @property {boolean} [preg]
 * @property {boolean} [hyperPreg]
 * @property {boolean} [loli]
 * @property {boolean} [extreme]
 * @property {boolean} [dicks]
 * @property {boolean} [incest]
 */

/** @type {Map<number, FctvChannel>} */
App.Data.FCTV.channels = new Map([
	[0, { // News
		tags: {},
		loop: true,
		intro: `officially known as the FCNN stream channel and you've started watching the middle of a news segment.`,
		episode: [
			{
				slaves: [
					App.Data.FCTV.actors.kirk,
					App.Data.FCTV.actors.jules
				],
				get text() {
					const r = [];
					r.push(`<p>The segment is being anchored by the middle aged Kirk McMahon, and he's joined by the ever-popular "Anchor Slave", Jules. She's got a nice figure, and the only thing she's wearing to cover her perky breasts is a pair of FCNN pasties. She has on a fine leather collar; the large gold charm hanging from the front seems to be a stylized emblem of a ship's anchor merged with a microphone. The pair seems to be discussing the recent actions and punishment of the reality show slave Slooty.</p>`);
					r.push(`<p>Jules seems to be quite passionate about the subject, the animated way she talks is causing her sizable tits to bounce all over the place. "It doesn't matter how famous or valuable that slut thinks she is, her behavior was just wrong on SO many levels. It makes all of us good slaves look bad. If you ask me, her master's choice of punishment fits the attention whore perfectly!"</p>`);
					r.push(`<p>Kirk's face looks more than a little surprised, but you can't quite tell if it's an act or not. "You won't get any argument from me that she deserves to be punished... but getting chained up with an obedience collar and feeder system in the middle of Times Square, free for public use? A slum like Manhattan, she'll never`);
					if (V.seeExtreme === 0) {
						r.push(`<i>enjoy</i>`);
					} else {
						r.push(`survive`);
					}
					r.push(`the 10 day sentence!"</p>`);
					r.push(`<p>Jules smiles. "That's exactly right, Master McMahon, she's going to be`);
					if (V.seeExtreme === 0) {
						r.push(`<i>hugged until she smiles</i>.`);
					} else {
						r.push(`fucked to death.`);
					}
					r.push(`Her precious popularity in the old world will have the locals lined up all the way to New New Jersey waiting for their turn. I'd never question her master's decision, but if it were me, I'd pump her full of curatives and stimulants during the sentence. That way, she doesn't`);
					if (V.seeExtreme === 0) {
						r.push(`<i>smile</i>`);
					} else {
						r.push(`die or pass out`);
					}
					r.push(`too soon. I think her master is being lenient after the way she badmouthed him in a live broadcast."</p>`);
					return r.join(" ");
				},
			},
			{
				slaves: [
					App.Data.FCTV.actors.red,
				],
				get text() {
					const r = [];
					r.push(`<p>The program is showing some poorly-shot video showing a woman with flaming-red short hair angrily shouting at a large but uncomfortable-looking man. The title text at the bottom says: <b>"EmancipationGate: Emancipation Movement Exposed"</b> The video continues, revealing more of the angry woman. She's short, wearing a sweaty tank top that makes her bushy underarm hair stand out. Based on the audio thus far, it seems she's trying to tell the large man to keep`);
					if (V.seeExtreme === 0) {
						r.push(`<i>hugging their captives until they smile</i>,`);
					} else {
						r.push(`torturing their captives until they die`,);
					}
					r.push(`that it has to be convincing for the camera. The man says he isn't comfortable doing that to kids, but the woman shouts him down by saying they're only migrant man brats before beginning some nonsensical babble about patriarchy and slavery. The video seems to be being shot on a small handheld device, and pans over to reveal a bunch of severely`);
					if (V.seeExtreme === 0) {
						r.push(`<i>hugged</i>`);
					} else {
						r.push(`beaten`);
					}
					r.push(`children in slave chains that look like obvious S & M props to your well-trained eye. The angry woman's rant is still continuing from the background, but suddenly stops to be replaced with a yell: <i>"Get the fuck away from the subjects, you better not be fucking filming any..."</i> and the video cuts out.</p>`);
					r.push(`<p>The segment cuts back to two news anchors, a dark-haired man with a mustache and an aging bottle blonde.</p>`);
					r.push(`<p>The bottle blonde speaks to the viewers. "Some of you may recognize the woman in that video as Angry Red, noted femsupremacist and a leading figure in the old world Emancipation Movement. The video you saw was released along with countless other media files and documents from the movement in the EmancipationGate hacktivist attack. This particular video has been confirmed by computer analysis to be behind the scenes footage from the movement's latest documentary about the horrors of slavery."</p>`);
					r.push(`<p>The mustached man looks knowingly at the camera. "Anyone remotely familiar with Free City slavery knew the documentary was complete bullshit, but what we didn't know was just how far those radicalists were willing to go to make us all look bad."</p>`);
					return r.join(" ");
				},
			},
			{
				get slaves() {
					const array = [App.Data.FCTV.actors.kirk];
					const slave = App.Data.FCTV.actors.jules;
					slave.vaginalAccessory = "large dildo";
					array.push(slave);
					return array;
				},
				get text() {
					const r = [];
					r.push(`<p>The segment seems to be more of a conversational piece. The two hosts are sitting next to each other on one couch. Samuel Klein, a handsome man with dark blonde hair and a winning smile, can't help but be overshadowed by his cohost. The popular SlaveAnchor Jules might be mistaken for just another gorgeous face and body, but it's her brilliant wit and sure-footed advocacy that made her famous. She's wearing her usual slave anchor collar, and her large natural breasts are only covered by the standard FCNN pasties, leaving the perky flesh free to jiggle enticingly. On this show her lower half is revealed; it's usually hidden behind a desk. The dark red material of her narrow panties matches her auburn hair, and reveals her broad hips and long slender legs.</p>`);
					r.push(`<p>The camera cuts back to two distinguished looking gentlemen, one is labeled by the screen as medical researchers.`);
					if (V.PC.skill.medicine === 100) {
						r.push(`You vaguely recognize both of them from your time studying medicine.`);
					}
					r.push(`</p><p>One of them continues the conversation, apparently answering a question. "That's right, the results of our research tell us what everyone already suspected, but now with an indisputable weight of evidence behind it." The other nods and continues, "our meta analysis examines over two decades of data, and nearly 6,000 independent studies. We can safely say that free city slaves are healthier than the average person living anywhere in the old world. While a few of the wealthiest countries of the old world may surpass one or two areas, our slaves have better nutrition, standard of living, are more psychologically stable, have longer lives, and are happier on average as well." The first gentleman interjects, "We even found strong evidence that the higher sexual tempo and libido-stimulating training given to sex slaves greatly contributes to their life span; they live even longer than the average slave, and even look younger than their age."</p>`);
					r.push(`<p>The camera switches back to the two anchors, showing an excited Jules hefting and bouncing her tits. "They've barely sagged at all since they stopped growing, now I know why!"</p>`);
					r.push(`<p>As the AnchorSlave continues to squeeze, one of the researchers answers from off camera. "That's right, it can be rather amazing. To tell you the truth, we didn't believe it at first, but the evidence made it too hard to ignore." Jules starts looking toward the backstage area trying to signal someone as the other researcher continues. "It's also important not to wear a bra unless you're doing high-impact cardio. We've known since the mid 20th century that wearing bras causes sagging; bras devastate the breasts of`);
					if (V.seePreg === 0) {
						r.push(`<i>friendly</i>`);
					} else {
						r.push(`postpartum`);
					}
					r.push(`women in particular, and promote breast cancer... Despite countless decades-long studies showing us this, the old world insists on forcing women to wear..."</p>`);
					r.push(`<p>It seems that Jules finally got the approval she was looking for, because she immediately reached down between her legs, causing the researcher to distractedly forget what he was saying. Apparently the panties she's wearing are of the dildo variety, because when she removes her hand you can see a tell-tale green indicator light glowing on the front of them. A cute rosy flush comes to Jules cheeks before she apologizes and urges the pair of researchers to continue.</p>`);
					return r.join(" ");
				},
			},
		]
	}],
	[1, { // Talk
		tags: {},
		loop: true,
		get intro() {
			const r = [];
			r.push(`which is currently showing`);
			if (FCTV.channelCount(1, 12, 'lt')) {
				r.push(`the newest episode of a`);
			} else {
				r.push(`a repeat of the`);
			}
			r.push(`popular competitive reality show`);
			if (FCTV.channelCount(1, 0, 'gt')) {
				r.push(`show: Next Top Breeder.`);
			} else {
				r.push(`show where several female citizens are competing for something.`);
			}
			return r.join(" ");
		},
		episode: [
			{
				get text() {
					const r = [];
					const MSL = App.Entity.facilities.masterSuite.employeesIDs().size;

					r.push(`<p>The intro sequence shows a succession of beautiful ladies either participating in a mixture of contrived competitions, or talking and going about their lives in a sorority-like setting.</p>`);
					r.push(`<p>The montage is overlaid with a narrator's voice: "12 of Canadia Arcology's most attractive women are all competing for the privilege of having the arcology owner's children. Clint Miles has desirable genes, and these ladies are determined to prove their worth as gestators. And here in Canadia, there are no restrictions on fertility drugs for the winner, so the competition this season is fierce! ${V.FCTV.channel.two} ladies have already been sent packing, who will be Canadia's... Next Top Breeder!?" The title finally pops up, redundantly labeling the show as 'Next Top Breeder: Canadia'.`);
					if (MSL >= 1 || S.Concubine) {
						r.push(`</p><p>You don't spend very much time actually watching the show; the randy opening, perverted competitions, and constant talk of creampies quickly has`);
						if (MSL >= 1 && S.Concubine) {
							r.push(`<span class="pink">${S.Concubine.slaveName}</span> eager for some attention from ${getPronouns(S.Concubine).possessive} own arcology owner. Of course, the same could be said for the other eager slaves living in your bedroom, and the situation quickly devolves into a lust-filled`);
							if (MSL > 1) {
								r.push(`orgy.`);
							} else {
								r.push(`threesome.`);
							}
						} else if (MSL === 0 && S.Concubine) {
							const {his2, him2, he2} = getPronouns(S.Concubine).appendSuffix(`2`);
							r.push(`<span class="pink">${S.Concubine.slaveName}</span> eager for some attention from ${his2} own arcology owner. You've trained ${him2} well, and ${he2} knows exactly how to please you. You spend the rest of the evening doing something a lot more fun than watching reality TV.`);
						} else {
							r.push(`the pleasure slaves in your bed eager for some attention from their own arcology owner. You spend the rest of the evening doing something a lot more fun than watching reality TV.`);
						}
					}
					r.push(`</p>`);

					return r.join(" ");
				}
			},
		]
	}],
	[2, { // 'Home and Slave'
		tags: {},
		loop: true,
		intro: `which is currently showing the 'Home and Slave' stream channel. The current show features a set of female twins wearing nothing but tool belts. Their assets aren't particularly noteworthy, but they have a great hourglass figure, toned muscles, and gorgeous girl-next-door faces. The girls are hosting a DIY show, and seem to be performing a lot of the work themselves. The occasional bead of sweat makes their smooth tan skin really stand out.`,
		episode: [
			{
				slaves: [
					App.Data.FCTV.actors.twin,
					App.Data.FCTV.actors.twin,
				],
				get text() {
					const r = [];
					r.push(`<p>It seems like this time they are working on modifications to an apartment to accommodate enormous anatomy. The pair demonstrate how to tastefully modify a doorway so that giant breasts,`);
					if (V.seeDicks === 0) {
						r.push(`<i>smiles</i>,`);
					} else {
						r.push(`testicles,`);
					}
					r.push(`and`);
					if (V.seePreg === 0) {
						r.push(`<i>hairdos</i>`);
					} else {
						r.push(`baby bumps`);
					}
					r.push(`can get through easily. Their final results weren't refined enough to use in your own home, but were pretty amazing for the economy-sized apartment they filmed at.</p>`);
					r.push(`<p>At the end of the show they test out the new doorways by bringing in a somewhat unusual slave. A naked`);
					if (V.seeDicks === 0) {
						r.push(`<i>funny cow</i>`);
					} else {
						r.push(`futanari`);
					}
					r.push(`wearing only a cowbell collar, she has massive milky tits, gigantic`);
					if (V.seeDicks === 0) {
						r.push(`<i>smile,</i>`);
					} else {
						r.push(`balls hanging low in her sack,`);
					}
					r.push(`and a belly engorged with what was probably a`);
					if (V.seePreg === 0) {
						r.push(`<i>five-course dinner.</i>`);
					} else {
						if (V.seeHyperPreg === 0) {
							r.push(`<i>single baby.</i>`);
						} else {
							r.push(`dozen babies.`);
						}
					}
					r.push(`</p><p>The`);
					if (V.seeDicks === 0) {
						r.push(`<i>fun</i>`);
					} else {
						r.push(`futa`);
					}
					r.push(`cow ambles through the modified door without a problem, resulting in a bouncy victory dance from the naked twins.</p>`);

					return r.join(" ");
				}
			},
			{
				slaves: [
					App.Data.FCTV.actors.twin,
					App.Data.FCTV.actors.twin,
				],
				get text() {
					const r = [];
					r.push(`<p>It seems like this time they are working on setting up a slave nutrition system inside a moderately-sized apartment. They're installing a deluxe system that has integrated nutritional sensing in addition to a food system that supplies the unit's two feeder/med-dispenser combo units. Amazingly, the whole thing fits into the kitchen without a problem, as they located the main system housing in the pantry. When they're finished, you couldn't tell the nutrition system is there, except for the two large dildos that are sticking out of the side of a cabinet.</p>`);
					r.push(`<p>After their work is done, you're treated to watching the young twins testing the system out. They each take one feeder and ride it to get a test suppository, before turning around and inhaling the cockfeeders for a small meal. You wonder at their choice for the order of events, sucking the cockfeeder they had just finished ramming up their ass, but they were so enthusiastic about it that you decide they probably liked it that way.</p>`);
					return r.join(" ");
				}
			},
			{
				slaves: [
					App.Data.FCTV.actors.twin,
					App.Data.FCTV.actors.twin,
				],
				get text() {
					const r = [];
					r.push(`<p>It seems like this time they are converting a bedroom into slave quarters. Rather than a complex or large project, this episode showcases a number of small projects. It's a pretty helpful show; a lot of what the nude twins cover will help owners house extra slaves without needing more space. The most interesting parts of the program to you are the slave training and libido upgrades they install.</p>`);
					r.push(`<p>The room is set up so that slaves sleep in something resembling bunk beds, though there are four beds instead of two. Instead of worrying about the lack of space, the twins use the confined sleeping arrangements as an advantage. A simple neural activity monitor combined with a few sources of stimulation or discomfort serve to condition the slaves while they sleep. The twins helpfully demonstrate for their audience the features of these beds. Part of the stain-proof mattress is covered with flexible strips of metal to conduct electricity for stimulation or pain. Focused speakers play naughty sounds, while a dim display can show a stream of pornography or other material without being bright enough to disturb the slave's sleep. The final addition is a quartet of vibrating dildos that extend from the bunk above to stimulate a slave while they sleep.</p>`);
					r.push(`<p>The whole setup seemed impressive, but you aren't really sure how effective it would be... particularly when you compare the likely cost of such a setup to an inexpensive cot on the floor.</p>`);
					return r.join(" ");
				}
			}
		]
	}],
	[3, { // 'Home Slave Shopping'
		// NOTE: These slaves are meant to be high quality and expensive, they are the product of the combined slave markets of all the Free Cities. Additionally, they won't follow the player's slave selling policies because they aren't being sold in the PC's arcology. Because they are purchased, it shouldn't be a balance issue or impact the game like a slave gift.
		tags: {},
		loop: true,
		// @ts-ignore
		disableSelection: true,
		intro: `which is currently streaming 'Home Slave Shopping'. It's a bit strange, shopping for slaves without inspecting them in person, but you have to admit it's kind of convenient. Plus, you might find something that'd be difficult to get in your own arcology's markets. You start watching at the end of one slave being displayed; the program goes into a lot of detail that isn't always available from shady salesmen at the market. Two hosts are displaying the merchandise and an older male reads details on each slave from a prompter, while a fit female works the slave for the camera to give viewers a good look at what they might purchase.`,
		outro: function(slave, show) {
			const p = document.createElement("p");
			let cost = slaveCost(slave);
			if (show < 3 || show > 6) {
				cost *= 1.3;
			} else if (show === 4) {
				cost *= 2;
			} else if (show === 6) {
				cost *= 0.7;
			}
			cost = 500 * Math.trunc(cost / 500);
			p.append(`The offered price is ${cashFormat(cost)}. `);

			if (V.cash >= cost) {
				p.append(
					App.UI.DOM.link(
						"Buy this contract.",
						() => {
							cashX(forceNeg(cost), "slaveTransfer", slave);
							jQuery("#fctv-watch").empty().append(App.UI.newSlaveIntro(slave));
						}
					)
				);
			} else {
				App.UI.DOM.appendNewElement("span", p, `You lack the necessary funds.`, ["red", "note"]);
			}
			p.append(App.Desc.longSlave(slave, {market: "generic"}));
			return p;
		},
		episode: [
			{// premium virgin
				tags: {},
				get slaves() { return [App.Data.FCTV.actors.premiumVirgin]; },
				text: function(slave) {
					const {He, he} = getPronouns(slave);
					return `<p>"Next up, we have a premium virgin named ${slave.slaveName}." A bright pink "VV" symbol flashes on the corner of the screen. "Take a good look, because ${he} is a product of the famous sex slave breeding program at Arcturus Arcology. Like all the slaves they sell, ${he}'s a premium <span class="pink">double virgin.</span> ${He} has excellent breeding potential, and while ${he} isn't that skilled yet, ${he}'s got good intelligence and is already well acclimated to the life of a sex slave."</p>`;
				}
			},
			{// hyperpregnant
				tags: {},
				get slaves() { return [App.Data.FCTV.actors.hyperPregnant]; },
				text: function(slave) {
					const r = [];
					const {his, he, him} = getPronouns(slave);
					r.push(`<p>"Next up, we have ${addA(slave.race)} breeder, young and healthy with an advanced`);
					if (V.seeHyperPreg === 0) {
						r.push(`<i><span class="pink">super pregnancy.</span></i>`);
					} else {
						r.push(`<span class="pink">hyper pregnancy.</span>`);
					}
					r.push(`${slave.slaveName} is really into making babies, and has even had ${his} hips surgically widened to help ${him} carry a large brood. Our tests here at HSS show that ${he}'s pregnant with ${slave.pregType} babies!"</p>`);
					return r.join(" ");
				}
			},
			{// superfetation
				tags: {preg: true},
				get slaves() { return [App.Data.FCTV.actors.superfetation]; },
				text: function(slave) {
					const r = [];
					const {girl, his, He, he, him} = getPronouns(slave);
					r.push(`<p>"Next up, we have a special slave named ${slave.slaveName} who has quite the gift, <span class="pink">superfetation!</span> ${He} can become pregnant while pregnant! Isn't that amazing? ${He} may have a few miles on ${him}, having just completed a double pregnancy, but with a trait like that, ${he}'s more than worth ${his} price if you like your ${girl}s to constantly have a bun in the oven."</p>`);
					return r.join(" ");
				}
			},
			{// MILF
				tags: {},
				get slaves() { return [App.Data.FCTV.actors.MILF]; },
				text: function(slave) {
					const r = [];
					const {He, he} = getPronouns(slave);
					r.push(`<p>"Next up, we have ${addA(slave.race)} <span class="pink">MILF.</span> ${He}'s no longer young, but still quite attractive. ${He} has been a slave for many years now, and has been trained well. ${He} also has a good array of skills that you can put to use. ${He} has huge tits and a huge ass to play with, but ${he}'d also make good`);
					if (V.seePreg === 0) {
						r.push(`<i>sandwiches</i>."</p>`);
					} else {
						r.push(`stock for a breeding program."</p>`);
					}
					return r.join(" ");
				}
			},
			{// discount young hottie
				tags: {},
				get slaves() { return [App.Data.FCTV.actors.youngHottie]; },
				text: function(slave) {
					const r = [];
					const {girl, his, he, him} = getPronouns(slave);
					r.push(`<p>"Next up, we have a bargain discount offer on a young ${slave.race} ${girl}. Unlike our usual stock ${he}'s something of a <span class="red">disobedient</span> slave, but that means savings for you, and all the fun of breaking in a new slave. We have to admit that ${his} previous owner had a hard time training ${him}, but I'm sure you can tell that ${his} body has`);
					if (slave.clit > 4) {
						r.push(`potential, just look at the <span class="pink">clit</span> on ${him}!"</p>`);
					} else {
						r.push(`potential!"</p>`);
					}

					return r.join(" ");
				}
			},
			{// huge balls
				tags: {dicks: true},
				get slaves() { return [App.Data.FCTV.actors.hugeBalls]; },
				text: function(slave) {
					const r = [];
					const {his, He} = getPronouns(slave);
					r.push(`<p>"Next up, we have ${addA(slave.race)} cum cow. Just take a look at that pair of <span class="pink">massive balls.</span> This slave also has a prostate stimulating hormone implant to ramp up ${his} cum production even further. ${He}'s a perfect fit for your dairy, or even your own kitchen creamery!"</p>`);
					r.push(`<p>The woman helping to display the slaves shows her hand to the camera; it's coated in a sticky layer of precum from handling the cum cow's equipment.</p>`);
					return r.join(" ");
				}
			},
			{// mpreg dickgirl
				tags: {dicks: true, preg: true},
				get slaves() { return [App.Data.FCTV.actors.mpreg]; },
				text: function(slave) {
					const {girl, his, he, him} = getPronouns(slave);
					return `<p>"Next up, we have a strong young ${slave.race} ${girl} that retains ${his} cock and balls. ${slave.slaveName} has something that makes ${him} special: thanks to medical science ${he}'s got a <span class="pink">functional ass womb.</span> That's right folks, this slave is fertile and can get knocked up if you inseminate ${his} asshole. That's pretty amazing, to be honest, and exceptionally rare. Don't let this opportunity slip by!"</p>`;
				}
			},
		]
	}],
	[5, {// 'Husbandry with Millie'
		tags: {preg: true},
		loop: true,
		intro: `which is currently showing an episode of the slave-breeding for beginners series: 'Husbandry with Millie'. The show is hosted by the famous and charismatic Millie, a slave breeder from Arcturus who appears to be in her mid thirties. She's wearing something resembling a maternity dress over her large pregnant belly, but the loose fabric doesn't hide her enormous hips and complementary ass. The dress only comes part of the way up her chest, leaving her large milk-engorged breasts exposed as they rest atop the fabric. Millie begins the show the same way as always, by giving her viewers some encouragement. "Anyone can become a breeder, even you! Just be willing to learn, and as I always say..." She pats her full belly meaningfully. "Be ready to get your hands dirty!"`,
		episode: [
			{
				slaves: [
					App.Data.FCTV.actors.millieBreeder
				],
				get text() {
					const r = [];
					r.push(`<p>Millie walks away from the classroom-like set, followed by a camera panning along beside her. Her purposeful steps and swinging hips set her breasts jiggling and sending droplets of milk flying from her dark milky nipples. It takes a sadly brief time for her to arrive at her destination, a mostly-white clinical-looking set prepared with several naked — and presumably fertile — slaves. As she comes to a stop in front of the line of slaves, all of the beautiful girls bow their heads and greet her. "<i>Hello Mistress Millie!</i>"</p>`);

					r.push(`<p>Millie ignores the naked slaves and turns to the camera. "Today we're going to cover the basics of choosing good breeding sluts, using some of my own stock. Of course, as we covered before, you want to choose breeders that have the traits you're looking for. Intelligence, temperament, bone structure, beauty, or simple cosmetic features like skin and hair color. But that's not all you need to look for!" Millie beckons to one of the slaves in the background, who rushes forward to stand in front of the camera. She points at the girl's flank, and the camera zooms in so that the screen is taken up by the girl's broad hips and moist pussy. "They call them child-bearing hips for a reason!" Millie starts rubbing the girl's hips as she continues. "Wide hips are a solid indicator of a good breeder; they mean a healthier pregnancy and easier — not to mention cheaper — birth. And if you want to increase your production with multiple pregnancies, wide hips are a must!"</p>`);

					r.push(`<p>The wide hips of the nubile slave girl suddenly walk off camera, and are soon replaced by the hips of another girl that are dramatically smaller. They aren't the hips of a man, but certainly bring to mind the narrow hips of an old-timey fashion model. The girl has a little extra weight, which is more obvious on her narrow frame, but you can tell she is fit with well-developed muscles. Millie starts touching her demonstration model as she points things out. "Sometimes, you're looking for narrow hips. Maybe you want to breed an athlete or pit fighter, or your tastes just run that way for some reason. You don't have to rule out a slut just because she has small hips, but there are some things to look for. First, you want to make sure the bitch is nicely plush, with well-distributed fat. This is important for a healthy pregnancy, but tends to be overlooked in narrow sluts. Also check their core strength. Muscles are even more important for narrow sluts, to help support the uterus and ease childbirth." She traces the shapes of the slave's hips. "They might be small, but make sure they're well formed, you want them to work properly. Finally, check the pubic bone, its joints with the iliac crests, and the fore part of the crests. You want a smooth curve throughout with loose joints that'll open wide n' easy when it's time."</p>`);

					r.push(`<p>With a smack on the ass, the bitch trots off camera to be replaced by a girl with her knees bent and feet spaced far apart. When the camera pans down you have a clear view of her sodden slit; the stage lights give the natural lubricant coating her inner thighs a more noticeable sheen. Millie rubs two fingers between the slaves' labia, and withdraws the now-soaked digits for the camera to see. "Remember! A wet cunt is a good cunt!" Without any warm-up, she bunches her fingers and thumbs together and inserts her entire hand into the slave's gaping pussy. "A loose baggy cunt may be no good for fucking, but I guarantee it's perfect for making you new slaves. And it may just help you save money, too. Loose cunts tend to drive down a slut's value, right at the perfect age for turning a slut into a breeding bitch."</p>`);
					return r.join(" ");
				}
			},
			{
				slaves: [
					App.Data.FCTV.actors.millieBreeder
				],
				get text() {
					const r = [];
					r.push(`<p>Millie walks towards the back of the set, returning with her hands behind her back. "This episode, we're going to talk about an important decision any breeder needs to make. Bull," she pulls a large life-like`);
					if (V.seeDicks === 0) {
						r.push(`<i>popsicle</i>`);
					} else {
						r.push(`dildo`);
					}
					r.push(`from behind her back, "or no bull?" This time she whips out something resembling a turkey baster. She gives both a hard squeeze, and they both squirt out a jet of`);
					if (V.seeDicks === 0) {
						r.push(`<i>whipped cream.</i></p>`);
					} else {
						r.push(`alabaster fluid.</p>`);
					}
					r.push(`<p>She drops both of the spent tools and turns to walk towards her chair, the camera following to give a good view of hefty ass and swinging hips.</p>`);
					r.push(`<p>Sitting down in her comfortable-looking chair, Millie begins her lecture. "So, thanks to the miracles of the modern dairy and industrial`);
					if (V.seeDicks === 0) {
						r.push(`<i>banana</i>`);
					} else {
						r.push(`cock`);
					}
					r.push(`milkers, a reliable supply of`);
					if (V.seeDicks === 0) {
						r.push(`<i>banana juice</i>`);
					} else {
						r.push(`cum`);
					}
					r.push(`is available for most citizens. This is definitely the least expensive option for those starting out, and combined with easy access, seems to be a popular choice for new breeders. It's also a common pitfall, so thank goodness you're watching now! Industrial dairies simply aren't focused on reproduction in most arcologies. Owners are focused on production, quantity over quality, and most of the material is used for slave nutrition and industrial purposes. Even if your arcology has a reproduction-focused`);
					if (V.seeDicks === 0) {
						r.push(`<i>banana cream</i>`);
					} else {
						r.push(`jizz`);
					}
					r.push(`farm, they're usually focused on breeding menials. You still have no way of knowing what you're getting. It makes any attempt at proper husbandry nearly impossible. You don't want to sink all your resources into buying and caring for breeding sluts, only to end up with a litter only fit to be menials!"</p>`);

					r.push(`<p>"Your best bet if you're low on resources is looking to prominent citizens with high quality slaves. Often times, for a modest stud fee, you can get your bitches pregnant with a known stud of high quality. Particularly when it comes to older bulls, you can often get your bitches bred for nearly the same cost as dairy`);
					if (V.seeDicks === 0) {
						r.push(`<i>cream!</i>`);
					} else {
						r.push(`jizz!`);
					}
					r.push(`You do have to do the leg work, but think of it as picking the best bull for your breeding plan. As you get more established, purchase an older bull for yourself. Older bulls are better-behaved, and still perfectly capable of helping to take care of your pregnant sluts, when they aren't knocking up the empty ones, that is. A slave may be old, but the DNA in that`);
					if (V.seeDicks === 0) {
						r.push(`<i>banana juice</i>`);
					} else {
						r.push(`cum`);
					}
					r.push(`is the same as it was 20 years ago!"</p>`);
					r.push(`<p>Millie gives the viewers a big smile. "If you take anything away from this episode, just remember that industrial`);
					if (V.seeDicks === 0) {
						r.push(`<i>juice</i>`);
					} else {
						r.push(`cum`);
					}
					r.push(`is used to make industrial slaves!"</p>`);
					return r.join(" ");
				}
			},
			{
				slaves: [
					App.Data.FCTV.actors.millieBreeder
				],
				get text() {
					const r = [];
					r.push(`<p>Millie walks towards the camera, approaching it at an angle, and giving the viewers a good look at her dripping tits. The camera pans while leaving part of Millie in-frame, revealing a naked slave on display. The slave is the perfect picture of a breeding bitch: gargantuan hips, toned muscles, plush softness, and a pair of milk-filled tits. Millie sounds happy as she explains her first display. "So we've covered what makes the perfect birthing slut, this one here gave birth just a few weeks ago." Millie's upper body takes up a quarter of the camera frame, and she provides some bouncy entertainment as the camera pans to the next display. It's a`);
					if (V.seeDicks === 0) {
						r.push(`<i>very happy</i>`);
					} else {
						r.push(`well-hung`);
					}
					r.push(`bull with`);
					if (V.seeDicks === 0) {
						r.push(`<i>large horns.</i>`);
					} else {
						r.push(`huge balls that look swollen with seed.`);
					}

					r.push(`</p><p>Millie stops to inspect the display, taking a moment to`);
					if (V.seeDicks === 0) {
						r.push(`<i>pat the happy bull's fur.</i>`);
					} else {
						r.push(`taste test the droplet of precum hanging from its semi-erect cock.`);
					}
					r.push(`</p><p>"You know how to pick a good bull too." She snaps her fingers, and the slave from earlier trots into view. The fertile slave gets down on all fours with her legs spread wide, and points her dripping snatch at the waiting bull`);
					if (V.seeDicks === 0) {
						r.push(`<i>to let it know that she isn't a threat.</i>`);
					} else {
						r.push(`to entice it into a good fucking and insemination.`);
					}
					r.push(`</p><p>Millie continues, "And of course, you know how to bring the two together to get your bitches good and bred."`);
					if (V.seeDicks === 0) {
						r.push(`<i>The bull snorts contentedly, and lets out a short "moo!"</i>`);
					} else {
						r.push(`The bull's cock quickly swells to full mast, and with a nod from Millie he positions himself on his knees behind the sow and mounts her.`);
					}
					r.push(`</p><p>As the two slaves behind her`);
					if (V.seeDicks === 0) {
						r.push(`<i>laugh and play,</i>`);
					} else {
						r.push(`fuck like rabbits,`);
					}
					r.push(`Millie continues. "We've covered all this, but you're probably dying to know: 'what comes after?'"</p>`);
					r.push(`<p>Millie walks once more, moving away from the moaning slaves until a beautiful slave nursing two babies and an odd looking machine come into view. "If you live somewhere that supports it, you could always sell the litter... you won't make much though. All the care that went into creating a high-quality litter will likely be wasted. Of course, you could always keep the litter; let the slaves raise 'em until they're old enough to be trained." Millie rubs the thin hair of one of the suckling infants. "That's the traditional way. There's good money in it if you're successful, but it's a sizable investment of time and money to get to the first sale. If you've kept up the breeding and have room, you'll finally be able to sell a new batch of slaves each year, and of course keep some for breeding." Millie gives the slave's hip and ass a quick caress. "This one here's a second generation breeding slut; she's already given me several healthy litters."</p>`);
					r.push(`<p>Millie faces the camera. "But what if you want to do some serious breeding? Maybe you want a litter that'll grow to have gigantic natural tits with rich milk that just pours out of the nipple, or maybe you want a litter with hips so wide that they can fit a head between their legs without opening them? The trouble is time..." Millie looks sad for a moment. "Slaves take too long to reach maturity; even if you start breeding 'em young, how many decades will it be before you reach that perfect third or fourth generation?" She walks over to the machine and pats it lovingly. "Thanks to this beauty of modern science, we can accelerate the growth of your most promising calf. Instead of waiting`);
					if (V.pedo_mode === 0) {
						r.push(`18 years`);
					} else {
						r.push(`${V.minimumSlaveAge} years`);
					}
					r.push(`to breed 'em, you can have them ready to go in`);
					if (V.pedo_mode === 0) {
						r.push(`only 3.`);
					} else {
						r.push(`as little as a year.`);
					}
					r.push(`Fact is, the newer models can have a sow ready to be bred in half a year, and give 'em some training and conditioning on the way. I've even heard rumors that the most cutting-edge tech will do it in 3 months."</p>`);
					r.push(`<p>"You may be thinking: 'as if I could ever afford something like that!'" Millie gives the camera a bright smile. "Don't worry; Mamma Millie's got you covered. It's true that most of you won't be able to afford one of these, not to mention the special electrical hookups and maintenance... but the fact that better models exist means that the older models don't have much use for the types of people that <b>can</b> afford them. That means empty incubators that are just too valuable to simply dispose of, and a chance for you to rent or lease one or two of 'em long enough to get a major jump start on your breeding program. It'll still be expensive, maybe even as much as a high-quality slave ready to be trained. You'll also have to deal with and treat the chemical damage. But when it comes to developing a solid breeding line to produce high quality litters, the time savings can't be beat. Just don't expect the ones fresh out of the incubator to be good for much other than making new slaves!"</p>`);
					return r.join(" ");
				}
			},
		]
	}],
	[6, {// 'Modern Dairy'
		tags: {},
		loop: false,
		get intro() {
			const r = [];
			r.push(`which is currently showing an episode of the 'Modern Dairy' edutainment series, which opens with a montage of milk-related food and cooking shots. After the last of the opening credits disappears, the show sticks to a single shot from the montage, a delicious looking bowl of cereal. The camera zooms out to reveal the show's host wearing her trademark cow print leotard, and getting just a little too much enjoyment out of her cereal. She slowly puts the spoon down while savoring her cereal, reluctantly swallowing and starting the show. "Hi there y'all, welcome to another episode of Modern Dairy!" She gives the camera a wave — setting her gargantuan melons wobbling inside the spandex-like leotard — and the camera fades to black.`);
			return r.join(" ");
		},
		episode: [
			{
				tags: {},
				get text() {
					const r = [];
					r.push(`<p>The camera fades in to show an excited Bess standing next to a double door labeled 'Dairy 3'. "I'm here at Arcology G-9 to give you a look at their state-of-the-art milking equipment." Bess gestures to her jiggling bosom. "As you can see, I'm terribly excited! I've heard this dairy's equipment is a pretty radical departure from the standard ones that look like dentist's chairs!" Without further ado, she pushes her way through the swinging doors, and sets off into the dairy. The camera follows, spending as much time focused on her seductively-swinging rear end as it does panning to look around the long room. The first thing you notice is that the lighting is a soft warm glow more at home in a spa than an industrial facility. The room consists of a long hallway, the row of milkers on either side are separated by fabric dividing curtains in earth tone colors, though most of them appear to be open. You didn't notice at first, but it seems like most of the milkers are occupied... the radically different shape tricked your trained eye for a moment.</p>`);
					r.push(`<p>Eventually Bess reaches the end of the hallway, and is greeted by a nearly-naked slave with visible muscles that seems to be a milk maid. "Hello there Ma'am, you must be Bess. My name is Anabell, and I'm a milk maid here. Welcome to dairy number three!"</p>`);
					r.push(`<p>Bess is distracted by the milk maid's`);
					if (V.seeDicks === 0) {
						r.push(`<i>greeting,</i>`);
					} else {
						r.push(`dangling cock – even soft, it looks massive –`);
					}
					r.push(`but manages to shake the proffered hand. "Thanks for having me!" She gestures widely to the room. "What's with the lights and... umm... décor?"</p>`);
					r.push(`<p>The milk maid smiles. "A happy cow is a productive cow, Ma'am. The cows spend lots of time here, and Master says 'a pleasant and relaxing environment makes a big difference in their production.' Master says that it's an investment to make the cows feel like they're in a fancy spa, but that it's so cheap it pays for itself in extra milk lickety-split."</p>`);
					r.push(`<p>Bess looks impressed. "You've got a pretty smart master! Seems like he takes good care of the cows, too!"</p>`);
					r.push(`<p>The milk maid gives an emphatic nod. "My Master's daddy, and his daddy's daddy were dairy farmers, so he knows what he's doin'. Master said that lots of folks think slaves don't deserve any care or fancy treatment, that slaves are animals and you can't give 'em anything without putting ideas in their heads. Master said those folks are right we don't <i>deserve</i> anything, but that otherwise those folks just don't know jack shit about raising livestock."</p>`);
					r.push(`<p>Bess smiles. "I guess G-9 isn't at the top of the quality and quantity charts by accident!" She moves over toward one of the occupied milkers to take a better look. Rather than a chair, it's set up almost like a massage table, and the slave is lying face-down on the table's comfortable padding. The chest area of the table is almost completely missing, allowing the cow's 15,000 CC udders to hang downward. Rather than hang painfully, however, they're well supported by some kind of strong fabric that looks soft but stretchy. Their supported shape seems ideal for milking, opening up the milk ducts and letting gravity drain the milk toward the exposed nipples. A clear cup is attached to each teat, rich milk flooding rhythmically down wide tubes to be collected in a massive intermediary reservoir. Bess turns back to the milk maid. "So I think I understand what the setup in the front is for, but what's all this going on in the back?"</p>`);
					r.push(`<p>Anabell walks up to the milking table, and gestures to the lower half. "Ma'am, is it okay if I answer one part at a time?" Bess gives a cheerful nod, so Anabell points to the cow's abdomen. "I know it's hard to see cause of that metal holdin' up the table, but there's actually an adjustable belly support there." The dairy slave gives the cow an affectionate rub on one butt cheek. "She may not look it right now, but this one here is more 'n seven months pregnant with triplets. The table supports the womb, taking the weight and pressure off the cow. All the cows say it's the most comfortable place to be when they're full of calf!" Smiling, Anabell points down between the cow's legs. The camera moves closer to get a good look, and the microphone starts picking up traces of audio from whatever program the cow's watching. Once the camera is positioned at the feet, you can see between her slightly-spread legs that there's a large adjustable-looking opening under her pubic region. More fascinating though, is the device attached to her groin; it looks really similar to an athletic cup. It's just a bit bigger and longer with some tubes and a wire coming out of it, and hides the cow's vulva and asshole from the camera.</p>`);
					r.push(`<p>With a questioning look, Anabell asks Bess "Ma'am, I figure you already know what the hole's for, but should I explain it for the camera?" Bess simply smiles and nods, indicating that the milk maid should continue. "Well all of you watching probably already guessed one reason for the hole there: it lets the tubes and such through nice and neat so we don't have to worry about 'em getting pinched or kinked. The other reason for the hole is that plenty of cows have`);
					if (V.seeDicks === 0) {
						r.push(`<i>sensitive legs.</i>`);
					} else {
						r.push(`big ol' balls that need milked too.`);
					}
					r.push(`There's an attachment there for a stretch mesh just like what we use for the udders, it supports 'em nice and comfortable. There's even a motor in the table there, moves the mesh to roll 'em around a bit and keep 'em producing." Anabell points toward the groin device. "We call this miracle gadget here a 'cup'... cause it looks like one, right?" Both Beth and Anabell give a chuckle at the rather flat joke. "Probably the best way to explain it'd be to take it out, would you like to see?"</p>`);
					r.push(`<p>Bess gives an excited nod, "Yes, that'd be great!"</p>`);
					r.push(`<p>Anabell taps out a practiced rhythm on the cow's ass cheeks, "We wouldn't wanna startle our cow here, so we have signals." The cow shifts her weight slightly to open her thighs more and tilt her hips slightly upward. With a practiced hand, the milk maid reaches in and pulls on the cup. Her arm obstructs the view, but you hear a slight hissing noise. It's only a moment before Anabell is showing the business side of the cup to the camera, revealing the cow's surprisingly wet cunt and gaped vagina along with a loose pink asshole. "So I suppose I'll start with the top here... So this butt plug here is pretty much a butt plug, though it's not meant to stretch a cow out. It helps hold everything in place, so the cup can stay in place without much suction, too much suction for too long is pretty bad for a cow and her unborn calves. At the tip you can see it looks a bit different than a normal butt plug; there's an opening that can feed in meds and liquids to keep 'em hydrated and healthy. There's also a gas diff.. diss... sorry, a gas diffusion membrane that lets out any pressure for practical reasons. The cup here also collects it though, something about methane and not wasting anything. This yellow tube here is where the gas goes."</p>`);
					r.push(`<p>Anabell points at the large and vaguely mechanical looking dildo. "Below the butt plug is the pussy plug. It does a whole bunch of things. Of course it helps stimulate the cow to improve production, but it also collects the cow's lubricant. As a cow gets closer to birth it stretches her out real good, and gets her hips ready to open nice and wide, so that the calves come out real easy. After eight months, we swap it out for one with a cervix massager." Pointing to the nubby bottom area of the cup, she continues. "Down here there are all these mechanical nubs that move around and vibrate, they keep a cow nice and stimulated. You can't really see it, but this is also where it collects the cow's`);
					if (V.seePee === 0) {
						r.push(`<i>paper and plastic refuse</i>`);
					} else {
						r.push(`pee`);
					}
					r.push(`for recycling. It wastes too much time for cows to be comin' and goin' to the`);
					if (V.seePee === 0) {
						r.push(`<i>garbage can,</i>`);
					} else {
						r.push(`toilet,`);
					}
					r.push(`but it'd a stinky mess if the cows just`);
					if (V.seePee === 0) {
						r.push(`<i>threw their trash</i>`);
					} else {
						r.push(`peed`);
					}
					r.push(`on the floor. With this, it's real easy for a cow to stay here all day. Maybe <i>too</i> easy, sometimes we hafta kick 'em out for breaks and exercise!"</p>`);
					r.push(`<p>Next Anabell points out how the table is split in two from the feet all the way up to the groin hole. "That probably looks strange, right? Easiest way to explain it would be to show you." She does something to the table out of view, and stands back. The two sections of table, each one holding a leg, start moving apart to spread the cow's legs. They stop when her legs are spread at a 45 degree angle, incidentally giving the camera a great view of the cow's pussy. "So it's real useful sometimes to have a cow's legs open like this, and it's also good to help stretch her hips. Next is the real magic though!" He reaches forward and touches the table again. This time though, the table's movements are a lot more complex. It bends her knees and waist, while tilting her ass upward and spreading her legs further. By the time it's done her body looks like it's ready for doggy style, with her thighs spread too wide to be practical for a bed, and the cow's hips and legs angled in such a way that her large ass is completely out of the way of her spread cunt. "Ah, Ma'am, if it's okay, it'd be really mean to put the table back without finishing first..."</p>`);
					r.push(`<p>Bess looks a little bit envious of the cow, but gives her approval. "Go ahead; I'll just help myself to some fresh milk while you're busy." She heads toward the dangling udders to retrieve her treat. It only takes Anabell a few shakes`);
					if (V.seeDicks === 0) {
						r.push(`<i>of the massage oil bottle before the cow's ass is glistening, and he gets to work massaging her.</i>`);
					} else {
						r.push(`to get her monstrous python of a cock throbbing and ready, and she doesn't waste any time hilting herself in the cow's ready pussy.`);
					}
					r.push(`</p><p>There's a loud muffled moo, and the camera reluctantly moves to get a shot of Bess.<p>`);
					r.push(`<p>Bess is on her hands and knees, her mouth full of nipple and milk, messily trying to keep up with the output of the prodigious mammary. She pinches the nipple to stop drinking for a moment so that she can speak to the camera. "Oh my god! This milk is SOOO good!" She sucks the cow's long nipple back into her mouth and resumes her feast.</p>`);

					return r.join(" ");
				}
			},
			{
				tags: {dicks: true},
				text: `<p>Instead of starting a new episode like you were expecting, it starts a teaser trailer for an upcoming episode. It seems to be focused on the semen side of the industrial dairy, and ends with some suggesting shots of Bess drinking "straight from the source."</p>`,
			},
			{
				tags: {extreme: true},
				text: `<p>Instead of starting a new episode like you were expecting, it starts a teaser trailer for an upcoming episode. It seems to be focused on bulk fluid production and menial bioreactor slaves, something of a departure from earlier episodes showcasing dairies focusing on high-quality product.</p>`,
			}
		]
	}],
	[7, {// "Architecture + Ecology = Arcology"
		tags: {},
		loop: true,
		get intro() {
			const r = [];
			r.push(`which is currently showing an educational program on arcologies titled: "Architecture + Ecology = Arcology".`);
			if (V.PC.skill.engineering > 50) {
				r.push(`The information is likely to be far too simplistic, considering your knowledge of engineering, but you watch anyway to see how most of your citizens view the massive structures.`);
			} else {
				r.push(`Your practical experience means that this program is unlikely to tell you anything you don't already know, but you watch anyway to see how an average citizen views an arcology.`);
			}
			r.push(`<p>A likely-artificial voice of an older man narrates while the program displays video to demonstrate the topic being narrated. The show looks crisp and professional, but you can tell it doesn't have the budget that the more sexually-charged shows do.</p>`);
			return r.join(" ");
		},
		episode: [
			{
				get text() {
					const r = [];
					r.push(`<p>This episode seems to be focusing on some basics in addition to an arcology's Penthouse.</p>`);
					r.push(`<p>A standard arcology is so huge that it needs to be divided into levels and sectors to make talking about it easier. Levels are the horizontal rows. An arcology is a very large building, and each Level includes many floors. Sectors are slices of those levels. For example, on Levels with four Sectors, each sector includes a quarter of each floor that's part of that Level. Each Sector is typically occupied by facilities, tenants, or both. Sometimes facilities are owned or leased by tenants! Now when your friend tells you to meet them at "promenade B" or mentions that they live in sector "7C", you'll know how those names came about.</p>`);
					r.push(`<p>In most arcologies with a single owner, the uppermost Level is called the Penthouse. It's an entire sector where the owner and slaves under his direct supervision live. With such a large space for a single person or family, there is a great deal of customization possible. Even two arcologies of the same design, built at the same time, are likely to have very different penthouses! It's always worth visiting a penthouse if you get the chance. Not all arcologies are built or owned by a single person, often there is a group or partnership of owners. After all, building a structure as massive as an arcology is an extremely expensive endeavor! In these cases, the term penthouse is typically still used to refer to the top sector, as it is often divided into a number of luxurious penthouse apartments for the owners.</p>`);
					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`<p>This episode seems to be focusing on the Promenade and residential areas.</p>`);
					r.push(`<p>Below the penthouse — and potentially some residential sectors — is the Promenade, which is a major social area and hosts most of the businesses which cater to the arcology's citizens. Promenade Sectors are occupied by shops, restaurants, and other amusements. A promenade is critical to the success of an arcology; it allows the arcology to function as a self-contained residence, and is important to the economy. Sometimes it's nice to head over to a different arcology in your Free City for some unique cuisine or shopping, but could you imagine having to go through all that trouble any time you wanted to shop or eat out? While the concept of a promenade is almost universal amongst arcologies, the design, layout, and decoration of each tends to be rather unique, making it a fun experience to visit the promenade of arcologies other than your own.</p>`);
					r.push(`<p>The next area common to all arcologies are the residential sectors filled with apartments and other living arrangements. While designs and layouts differ — some arcologies have luxury residential areas that resemble an old-fashioned neighborhood complete with artificial sky — the purpose is always to house arcology citizens. Residential areas are critical for an arcology, in order to have a functioning self-contained economy. While all citizens in an arcology are fortunate, some are more fortunate than others. Lower-class citizens commonly live in dense efficiency apartments, while wealthy citizens often live in opulent sectors with large apartments. Without citizens there would be nobody to own or operate the stores, restaurants, and other attractions in the arcology, and there would be nobody to purchase those goods or services either!</p>`);
					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`<p>This episode seems to be focusing on the lower levels, the Concourse and Service Level.</p>`);
					r.push(`<p>Another common level for an arcology is the Concourse, which is typically located near the bottom of the structure. Like the Promenade, it hosts businesses, but these focus less on the luxury and entertainment needs of citizens than the Promenade. The Concourse typically houses bulk trade, necessary services such as medical clinics, corporate offices, research and development centers, and even education facilities. The best universities in the world are located on the concourse level of an arcology! Of course, the concourse also houses slave markets and slave training facilities. Some arcologies have arenas for sports or other events, while others have venues for sport combat ranging from traditional octagon fighting rings to pits reminiscent of ancient gladiatorial combat. If you're lucky, your arcology may just have a public arcade, where a variety of needs can be met at an affordable price. With research pointing to the benefits of arcades to adolescent development, family-friendly arcologies are quickly adding arcades of their own!</p>`);
					r.push(`<p>The lowest and largest level is typically known as the Service level. Its Sectors are occupied by manufacturing and industry, including the production of food resources such as livestock facilities and dairies. Menial slaves are housed in the Service level, and often work there too. The service level also contains much of an arcology's infrastructure, supplying clean water and electricity to the citizens and businesses. Another common sight in the service level is that of a warehouse, which stores the goods and raw materials an arcology needs, and also facilitates trade with other arcologies. Finally, the Service level may contain barracks and training facilities for mercenaries or arcology militia tasked to protect it from the old world.</p>`);
					return r.join(" ");
				}
			},
		]
	}],
	[8, {// "Extreme Gestation for Fun and Profit"
		tags: {hyperPreg: true, preg: true},
		loop: true,
		intro: `which is currently showing a preview of the how-to series "Extreme Gestation for Fun and Profit", hosted by Millie. It seems like the show's going to cover topics ranging from hyper-pregnancy to broodmother implants, and even hints and some sort of medical technique to allow anal pregnancy in males.`,
		episode: [
			{
				text: null,
				slaves: [
					App.Data.FCTV.actors.millie
				],
			},
		]
	}],
	[9, {// FS Documentaries
		tags: {},
		loop: true,
		intro: ` which is currently showing a documentary on the `,
		episode: [
			{
				get slaves() {
					const slave = App.Data.FCTV.actors.FSmodel;
					slave.belly = 10000;
					if (V.seeHyperPreg === 1) {
						slave.belly *= 2;
					}
					if (V.imageChoice === 4) { // compensate for WebGL's smaller bellies
						slave.belly *= 2;
					}
					slave.preg = 35;
					slave.makeup = 2;
					slave.clothes = "nice business attire";
					slave.shoes = "none";
					return [slave];
				},
				get text() {
					const r = [];
					r.push(`surging Repopulation movement: "Continuing the Dream". After the opening credits, the documentary introduces a young and extremely pregnant woman as the commentator. The program makes an impassioned argument about the need for a new generation of citizens and slaves that were born into the dream of the Free Cities. The woman is wearing semi-conservative business attire, and has on elegant makeup. She looks somewhat plain when compared to the hyper-sexualized style of other FCTV shows, though she does make it plain over the course of the program that she loves sex more than ever. She tends to use herself as an example to show that pregnancy no longer means limitations or sacrifice, instead emphasizing that she's on her fifth pregnancy and would rather be with child than without.`);
					r.push(`<p>The woman makes two main points during the course of the documentary. The first is that the combined population of the Free Cities needs to grow explosively for 'Free City Society' to become stable. She points out several economic reasons, including the drive to invest in research and infrastructure. She has interviews with experts explaining the need for independence; that the Free Cities are still dependent on the old world industrially and financially, and that the population must expand dramatically to avoid going down with the metaphorical ship. The more Free Cities there are, the more they become free and independent of the old world.</p>`);
					r.push(`<p>The second point concerns the source of the new citizens and slaves that the Free Cities need. Her arguments concerning citizens focus on the unique culture of the Free Cities, and the direction that the future society will take. She points out that immigrants from the old world are rooted in its decaying culture. She asks her viewers how long it took them to adapt to their new lives, and how often they find themselves doubting their new home subconsciously. She admits that even she sometimes finds something wrong or repulsive, until she realizes that it's the ghost of her past life clinging to her. A noted psychologist talks about the strong hold people's earlier lives has on them, and how developing the promise of the Free Cities will need a generation untainted by the old world. The documentary's argument for slaves largely comes down to the fact that second-generation slaves are happier, better adjusted, and simply better slaves.`);
					if (policies.countEugenicsSMRs() > 0) {
						r.push(`It also points out the practical problems that the mass importation of slaves will cause in the gene pool.`);
					}
					r.push(`</p><p>Overall, it's a convincing documentary, if a little too emotional for your tastes.</p>`);
					return r.join(" ");
				}
			},
			{
				get slaves() {
					const slave = App.Data.FCTV.actors.FSmodel;
					if (!FutureSocieties.isActive('FSGenderFundamentalist')) {
						slave.dick = 6;
						slave.boobs = 750;
						slave.clothes = "nice business attire";
						slave.shoes = "flats";
					} else if (!FutureSocieties.isActive('FSGenderRadicalist')) {
						slave.faceShape = "masculine";
						slave.waist = 120;
						slave.weight = 120;
						slave.boobs = 100;
						slave.butt = 0;
						slave.hips = -1;
						slave.shoulders = 1;
						slave.dick = 2;
						slave.clothes = "conservative clothing";
						slave.shoes = "flats";
					}
					return [slave];
				},
				get text() {
					const r = [];
					if (!FutureSocieties.isActive('FSGenderFundamentalist')) {
						r.push(`increasingly-popular Gender Radicalist movement titled: "Power, not Biology". After the opening credits, the documentary introduces an androgynous documentarian in a nicely-cut suit. The finely tailored suit doesn't try to hide the person's breasts, which seem to be a pretty average D-cup. Similarly, another bulge is visible stretching down one of the pants legs. The futanari opens with a pretty simple question: "Am I a man, or am I a woman?" The documentary is focused on answering that question in the context of a modern era where medical science means that genitalia are irrelevant. It argues that a person's body no longer has any relation to their sexuality or ambition, that being free means choosing the body that pleases you most, and that society needs new criteria from which to determine gender.`);
						r.push(`<p>The criteria suggested by the documentary is power. The idea is simple; the powerful are male, the weak are female. It argues that the biology and sexual proclivities of a person simply can't represent them any longer. The powerful are often free to choose the body and activities they wish to pursue, while the weak have those decisions made for them. It's a practical argument, and the documentary gives a long list of evidence supporting it, from expert interviews to ancient civilizations that followed a similar idea. The concept is somewhat appealing to you; after all, you wield extraordinary power, and a large part of that power includes altering the bodies of others. Whatever you choose to do, you can't see any reason to let your slaves and citizens criticize you for it.</p>`);
					} else if (!FutureSocieties.isActive('FSGenderRadicalist')) {
						r.push(`conservative Gender Fundamentalism movement titled: "It's Eve, NOT Steve". After the outdated graphics finish displaying the garish opening credits, a portly man in late middle age introduces himself as Reverend Brad, the apparent commentator of the program. You don't pay much attention, but learn that apparently the Futanari Sisters are whore agents of Satan. You also learn that you're apparently destined for hell because of the medical technology in your penthouse that could be used to alter someone's naughty bits. You did get a good laugh when the reverend started yelling that choir boys are boys, and if he wanted a girl he would've found a nun.`);
						r.push(`<p>You have to admit that most of the show is complete bullshit, but you can't deny that it's useful for controlling your citizens. As long as they're filling their heads with this bullshit, they won't be getting any dangerous ideas from somewhere else. In a more practical sense, it's a lot easier to manage an arcology and a house full of slaves when you don't have to worry about crazy gender issues or people disliking pregnant slaves.</p>`);
					}
					return r.join(" ");
				}
			},
			{
				get slaves() {
					const array = [];
					let slave = App.Data.FCTV.actors.FSmodel;
					if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
						slave.dick = 4;
						slave.boobs = 100;
						slave.hLength = 10;
						slave.hColor = "black";
						slave.clothes = "conservative clothing";
						slave.shoes = "flats";
					} else if (!FutureSocieties.isActive('FSAssetExpansionist')) {
						slave.weight = -30;
						slave.butt = 0;
						slave.boobs = 450;
						slave.clothes = "a halter top dress"; // changed from "a slave gown" until WebGL model is changed
						slave.shoes = "heels";
					}
					array.push(slave);

					slave = BaseSlave();
					slave.devotion = 0;
					slave.trust = 0;
					slave.hLength = 50;
					slave.hStyle = "luxurious";
					slave.hColor = "blonde";
					slave.boobs = 700;
					slave.boobShape = "perky";
					slave.waist = 180;
					slave.butt = 3;
					slave.hips = 3;
					slave.clothes = "a ball gown";
					slave.shoes = "heels";

					array.push(slave);
					return array;
				},

				get text() {
					const r = [];
					if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
						r.push(`growing Asset Expansionist movement titled: "More of a Good Thing". After a brief set of opening credits the documentary dives immediately into short clips of numerous interviews with stacked women stating that they love having big tits and a big ass. Eventually, a man and woman are introduced as the hosts of the program. Both are finely dressed in the recent fashions, and despite the subject of the documentary, they don't have humongous assets. The woman does have huge breasts, wide hips, and a large derrière; the man has a noticeable bulge in his pants, but nothing extreme. The hosts explain that seeing Asset Expansionism as a call for ridiculous size is something of a misconception. They emphasize that it's about the freedom to enjoy more of a good thing.`);
						r.push(`<p>The documentary makes several arguments in favor of the movement, and is clear about explaining the natural biological attraction humans have to large assets. By interviewing stacked members of the movement and psychological experts alike, they try to demonstrate how larger assets lead to happier and more pleasurable lives, both in and out of the bedroom. The documentary neatly tops off its argument by demonstrating how assets have been expanding naturally since the start of the twentieth century, and claiming that it's silly to idolize the way humans looked before modern nutrition and medicine. Western countries in the old world already had average bust sizes of D-cup or larger by the turn of the century, the hosts claim that trying to go back to smaller sizes is synonymous with reducing the prosperity of free citizens.</p>`);
					} else if (!FutureSocieties.isActive('FSAssetExpansionist')) {
						r.push(`Slimness Enthusiast counter movement titled: "Slim Is In". Artistic opening credits play across the screen before a slim woman walks up and begins talking to the camera conversationally. She seems to be in her mid to late thirties, and is wearing conservative makeup to accent her natural beauty. Her narrow waist combines with her slim hips and full shoulders to create a balanced but muted hourglass profile. It's a look that was popular for decades on fashion models in the old world, and it improves the attractiveness of her B- or C-cup breasts and taut butt. It's obvious that the woman aspires to be a role model in addition to being the documentary's commentator.`);
						r.push(`<p>Much of the documentary's arguments center around the concept of fashion and the privileged. They point out how in the past societal changes have altered what people find attractive, giving skin tans as an example. When most worked outside and only the privileged stayed indoors pale skin was considered attractive. When the world changed and most people worked indoors, suddenly the tan skin of those with leisure time to spend outside came into vogue. She argues that modern hormones can easily expand the assets of the masses, but that only the privileged can afford to sculpt themselves into an ideal form like hers. She points out that even though the masses may imitate with surgery, they'll never be able to copy the naturally good bone structure and vibrancy of the well-bred elite.</p>`);
					}
					return r.join(" ");
				}
			},
			{
				get slaves() {
					const array = [];
					let slave;
					if (!FutureSocieties.isActive('FSTransformationFetishist')) {
						slave = App.Data.FCTV.actors.FSmodel;
						slave.devotion = 100;
						slave.trust = 100;
						slave.hLength = 50;
						slave.hStyle = "luxurious";
						slave.hColor = "blonde";
						slave.boobs = 700;
						slave.boobShape = "perky";
						slave.waist = 100;
						slave.butt = 3;
						slave.hips = 3;
						slave.clothes = "a ball gown";
						slave.shoes = "heels";
						array.push(slave);

						slave = BaseSlave();
						slave.dick = 4;
						slave.boobs = 100;
						slave.hLength = 10;
						slave.hColor = "grey";
						slave.clothes = "conservative clothing";
						slave.shoes = "flats";
						array.push(slave);
					} else if (!FutureSocieties.isActive('FSBodyPurist')) {
						slave = BaseSlave();
						slave.dick = 4;
						slave.boobs = 100;
						slave.hLength = 10;
						slave.hColor = "grey";
						slave.clothes = "a military uniform"; // closest thing to a noir detective trenchcoat we have
						slave.shoes = "flats";
						array.push(slave);
					}
					return array;
				},
				get text() {
					const r = [];
					if (!FutureSocieties.isActive('FSTransformationFetishist')) {
						r.push(`spreading Body Purist movement titled: "Don't Settle for Imitations". The opening credits are displayed over a series of comparison images showing beautiful breasts and asses next to obviously artificial imitations of the same. The screen splits and shows the two hosts in their own environments side by side. One is an extremely attractive doctor, her body is exquisitely curvy underneath her lab coat and her face is an impossible combination of beautiful and cute. The other host is an artist with graying hair; he's working in his studio to create a life-size sculpture of the first host. He starts off the documentary by asking why people are so eager to destroy the natural beauty of the human form. The doctor continues by asking why people are so impatient that they get implants instead of using a superior process of targeted hormonal growth.`);
						r.push(`<p>The documentary keeps up the two-viewpoint style and approaches the issue from two directions. The first is the stark aesthetic differences between natural and artificial bodies. It demonstrates why implants always fall short of the beauty they seek to imitate, and how those with implants are doomed to a vicious cycle of surgery to try and recapture the beauty they lost in the initial surgery. The other angle, presented by the doctor, is a lot more practical. It points out the numerous shortcomings of implants when compared to natural growth, such as the frequent need for maintenance surgeries, the significant extra health risks, the reduced pleasure and sensitivity felt by implant patients, and the extreme difficulty of a patient to get what they want. Taken together the argument is pretty simple: why get implants when other medical options are cheaper, safer, more effective, healthier, and more attractive?</p>`);
					} else if (!FutureSocieties.isActive('FSBodyPurist')) {
						r.push(`rise of the Transformation Fetish titled: "The Mass Insanity of Adding Mass". The opening credits are styled to look like a psychological case study from a mental institution. When the credits finish, the video cuts to a scene of a man sitting behind a desk, the whole shot is high contrast due to the harsh lighting from a lone desk lamp. The middle-aged man screams 'hard-boiled' and looks like he walked straight out of a noir film to host this documentary. His opening monologue makes it pretty clear that this documentary has a lot of parallels with a crime documentary. Worse, is that the evidence and expert witnesses available to the producers were apparently overwhelming, because the program seems rushed trying to fit as much as it can into a narrow time slot.`);
						r.push(`<p>Evidence and whatever else be damned, this isn't the kind of documentary that should be on the FCTV stream in your arcology. You tell ${V.assistant.name} to remind you to send a complaint in the morning.</p>`);
					}
					return r.join(" ");
				}
			},
			{
				get slaves() {
					const slave = App.Data.FCTV.actors.FSmodel;
					slave.belly = 10000;
					if (V.seeHyperPreg === 1) {
						slave.belly *= 2;
					}
					if (V.imageChoice === 4) { // compensate for WebGL's smaller bellies
						slave.belly *= 2;
					}
					slave.preg = 35;
					slave.makeup = 2;
					slave.clothes = "nice business attire";
					slave.shoes = "none";
					return [slave];
				},
				get text() {
					const r = [];
					r.push(`surging Repopulation movement: "Continuing the Dream". After the opening credits, the documentary introduces a young and extremely pregnant woman as the commentator. The program makes an impassioned argument about the need for a new generation of citizens and slaves that were born into the dream of the Free Cities. The woman is wearing semi-conservative business attire, and has on elegant makeup. She looks somewhat plain when compared to the hyper-sexualized style of other FCTV shows, though she does make it plain over the course of the program that she loves sex more than ever. She tends to use herself as an example to show that pregnancy no longer means limitations or sacrifice, instead emphasizing that she's on her fifth pregnancy and would rather be with child than without.`);
					r.push(`<p>The woman makes two main points during the course of the documentary. The first is that the combined population of the Free Cities needs to grow explosively for 'Free City Society' to become stable. She points out several economic reasons, including the drive to invest in research and infrastructure. She has interviews with experts explaining the need for independence; that the Free Cities are still dependent on the old world industrially and financially, and that the population must expand dramatically to avoid going down with the metaphorical ship. The more Free Cities there are, the more they become free and independent of the old world.</p>`);
					r.push(`<p>The second point concerns the source of the new citizens and slaves that the Free Cities need. Her arguments concerning citizens focus on the unique culture of the Free Cities, and the direction that the future society will take. She points out that immigrants from the old world are rooted in its decaying culture. She asks her viewers how long it took them to adapt to their new lives, and how often they find themselves doubting their new home subconsciously. She admits that even she sometimes finds something wrong or repulsive, until she realizes that it's the ghost of her past life clinging to her. A noted psychologist talks about the strong hold people's earlier lives has on them, and how developing the promise of the Free Cities will need a generation untainted by the old world. The documentary's argument for slaves largely comes down to the fact that second-generation slaves are happier, better adjusted, and simply better slaves.`);
					if (policies.countEugenicsSMRs() > 0) {
						r.push(`It also points out the practical problems that the mass importation of slaves will cause in the gene pool.`);
					}
					r.push(`</p><p>Overall, it's a convincing documentary, if a little too emotional for your tastes.</p>`);
					return r.join(" ");
				}
			},
		],
	}],
	[10, {// 'Cum and Cream Challenge'
		tags: {extreme: true},
		loop: true,
		get intro() {
			const r = [];
			r.push(`which is currently showing a competitive game show '<i>Cum and Cream Challenge.</i>' The program has a short opening sequence showing a variety of male and female contestants competing in a variety of lewd and messy body fluid competitions. The program flashes to a title screen where the letters are being spelled out in white fluids: "CUM and CREAM CHALLENGE". The writing is messy enough to`);
			if (FCTV.channelCount(10, 1)) {
				r.push(`make you wonder`);
			} else {
				r.push(`keep you wondering`);
			}
			r.push(`if slaves were actually trained to spell out the text each week, or if it's just some clever camera work. The camera pans up past a large dripping`);
			if (V.seeDicks === 0) {
				r.push(`<i>frankfurter</i>`);
			} else {
				r.push(`cock`);
			}
			r.push(`and two massive nipples, eventually revealing the two hosts that look to be in their early twenties.`);
			if (V.FCTV.channel[num(10, true)] < 2) {
				r.push(`A muscular man wearing athletic clothes, and a buxom young woman in a bikini that looks more like a micro bikini on her large breasts and hips. The pair is helpfully labeled on screen as Mike and Mindy, and as the camera gets closer it reveals that both have rather sizable endowments. Mike's crotch is soaked, and Mindy's bikini top allows small rivulets of milk to stream down from the sodden fabric.`);
			} else {
				r.push(`The fluid enthusiast Mike and Mindy pair are wearing their usual style in new colors, the clothes appearing to be as soddenly wet as any other episode.`);
			}

			r.push(`<p>Mindy kicks off the show, speaking to the audience. "Welcome to another episode of <i>Cum and Cream!</i>"</p>`);
			return r.join(" ");
		},
		episode: [
			{
				get slaves() {
					return [
						App.Data.FCTV.actors.mindy,
						App.Data.FCTV.actors.mike
					];
				},
				get text() {
					const r = [];
					r.push(`<p>Mike smoothly continues. "We've got a great show for you tonight! A male-female team challenge!"</p>`);
					r.push(`<p>"That's right Mike, and this time we've mixed it up! It's a production AND inflation challenge. Just thinking about it has me leaking top and bottom!"</p>`);
					r.push(`<p>"You don't have to tell me Mindy, I can see your puddle! In this contest, two teams will compete to produce the largest combined volume of cum and cream. The losing team goes on to a sudden-death inflation contest!"</p>`);
					r.push(`<p>Mindy bounces with excitement, sending milk everywhere, and freeing half of one long nipple from her bikini. "All the cum and cream from the previous contest administered anally, first one to tap out goes to the Loser's Pit!"</p>`);
					r.push(`<p>You watch with fascination through the contest, hanging on the edge of your seat during the final inflation challenge as the contestants' stomachs bulge further and further.</p>`);
					if (V.seeDicks === 0) {
						r.push(`<p><i>Everybody smiles and has a good time. The End.</i></p>`);
					} else {
						r.push(`<p>Suddenly, the male's taut stomach shifts and wobbles and he lets out an agonized scream. Medics rush to his side, and it cuts back to the hosts applauding his determination to win.</p>`);
					}
					return r.join(" ");
				}
			},
			{
				get slaves() {
					return [
						App.Data.FCTV.actors.mindyBloated,
						App.Data.FCTV.actors.mike
					];
				},
				get text() {
					const r = [];
					r.push(`Mike unexpectedly moves over and starts rubbing Mindy's belly, the extra attention highlighting how big her stomach is. "Mindy, don't tell me you went and got yourself knocked up... Your belly has gotten downright huge!"`);
					r.push(`<p>Mindy laughs and chides Mike. "Oh Mike! You know I'm waiting for the perfect`);
					if (V.seeDicks === 0) {
						r.push(`<i>smile</i>`);
					} else {
						r.push(`cock`);
					}
					r.push(`before I try out womb inflation!" She uses both hands to grab a handful of each of her large udders. "You know I use my own milk to keep myself pumped up, right? Well these babies have stepped up their production lately, nearly`);
					if (V.showInches === 2) {
						r.push(`four liters`);
					} else {
						r.push(`a gallon`);
					}
					r.push(`a session with my milker. I figure it was my body's way of telling me it's time to step up my inflation game!"</p>`);
					r.push(`<p>Mike laughs along with Mindy before reaching over to grab the closest triangle of Mindy's bikini top. Yanking it up off her breast, he gets a firm grip on her nearly`);
					if (V.showInches === 2) {
						r.push(`4-inch-long`);
					} else {
						r.push(`10-centimeter-long`);
					}
					r.push(`milky nipple before bending over and sucking it into his mouth to drink straight from the teat. After a few swallows he straightens up and faces the camera once more. "Wow, delicious as always, Mindy! You should start sending some of that rich cream my way!"</p>`);
					r.push(`<p>Mindy doesn't look at all bothered by Mike's impromptu snack, and doesn't even attempt to pull her bikini top back into place. "Sure thing Mike, but for now, I'm sure our viewers are dying to know what we've got lined up for the show!"</p>`);
					r.push(`<p>Mike nods excitedly. "No new events tonight, but it's still a fan favorite! The Suck n' Gulp Jizz Challenge!"</p>`);
					r.push(`<p>"Three hungry ladies, and plenty of`);
					if (V.seeDicks === 0) {
						r.push(`<i>donuts</i>`);
					} else {
						r.push(`large studly balls`);
					}
					r.push(`ready to feed them... once they've earned it, that is! The scales are ready to measure our contestants before they get started, but first....."</p>`);

					return r.join(" ");
				}
			},
			{
				get slaves() {
					return [
						App.Data.FCTV.actors.mindy,
						App.Data.FCTV.actors.mike
					];
				},
				get text() {
					const r = [];
					r.push(`Both Mike and Mindy are both wearing ecstatic smiles, looking more excited than ever. Mike doesn't try to hide his raging`);
					if (V.seeDicks === 0) {
						r.push(`<i>smile</i>`);
					} else {
						r.push(`erection`);
					}
					r.push(`as he continues the introduction. "Tonight we have a truly special treat for you, and it's all thanks to Arcology Imperiales!"`);
					r.push(`<p>Mindy continues, and makes no attempt to hide the fact that she has one hand stuffed inside her bikini bottom. "Thanks to the wonderful Dr. Picarde, owner of Arcology Imperiales, we have access to three amazing sex slaves for tonight's challenge!"</p>`);
					r.push(`<p>Mike nods enthusiastically. "Mindy, tell everyone what makes them so special!"</p>`);
					r.push(`<p>Mindy gushes her explanation. "Well they're inflation fetishists, of course, but they're also masochists! But that's not all! They've been voluntarily modified with cutting-edge surgery to allow them to burst when they've been overfilled, without any danger at all!"</p>`);
					r.push(`<p>"Thank you Dr. Picarde! Modern medical science is simply amazing, and you know that arcology has to be the perfect place for enhancement surgery!"</p>`);
					r.push(`<p>"That's right Mike, I didn't even realize what was possible, and you know how much I love the sport! I'm seriously going on a trip to visit Imperiales if <i>Cum and Cream</i> gets another season! All you fans out there, if you want to see me stuffed like mad next season, keep supporting the show!"</p>`);
					r.push(`<p>"That's awesome Mindy! With our numbers, and thanks to all our fans, I'm sure we'll be getting a fourth season! So, what kind of modifications were you thinking about?"</p>`);
					r.push(`<p>"Definitely an elasticizing treatment, but I also heard there is a new procedure allowing you to stay inflated nearly all the time... Of course, I want the Sphincter-Seal O-ring implant... With no need for a plug, I'll be ready for someone to give me a top-up at any time! The possibilities are so exciting, I think if I get the O-ring, you'll have to give me a good pumping during the show so the audience can see!"</p>`);
					r.push(`<p>"Certainly Mindy! You know I'll help you fill any hole you want, it's the least I can do! After all, you went and hired that awesome MilkSlut Delivery company to deliver some of your fresh cream each morning... I gotta say, it goes perfect with my Arcol-O-gies`);
					if (V.seeDicks === 0) {
						r.push(`<i>smile</i>`);
					} else {
						r.push(`prostate`);
					}
					r.push(`enhancement cereal each morning!"</p>`);
					r.push(`<p>After talking about the surgery, Mindy is openly milking one nipple while her other hand goes wild at her crotch. "Okay Mike, I can't wait anymore, let's start the challenge!"</p>`);
					r.push(`<p>You watch the challenge, which involves three young contestants with huge`);
					if (V.seeDicks === 0) {
						r.push(`<i>smiles,</i>`);
					} else {
						r.push(`balls,`);
					}
					r.push(`each of them fucking a slave full of cum until one massively swollen stomach finally bursts.</p>`);
					return r.join(" ");
				}
			},
		]
	}],
	[11, {// sag-B-gone
		loop: true,
		episode: [
			{
				get slaves() {
					const array = [];
					if (S.Concubine) {
						array.push(S.Concubine);
					}
					return array;
				},
				get text() {
					const r = [];
					const {He = '', him = '', his = ''} = S.Concubine ? getPronouns(S.Concubine) : {};
					const {title: Master = ''} = canTalk(S.Concubine) ? getEnunciation(S.Concubine) : {};

					if (FCTV.channelCount(11, 1, 'gt')) {
						r.push(`, once again,`);
					}
					r.push(`which is currently showing an infomercial attempting to sell a product named "sag-B-gone" that claims to be able to prevent breasts from naturally sagging under their own weight.<p>`);
					if (V.purchasedSagBGone === 1) {
						r.push(`You've already made the mistake of ordering the sham of a product. While it gave you a great excuse to fondle breasts, it's not like you needed one in the first place.</p>`);
						if (S.Concubine && canTalk(S.Concubine)) {
							r.push(
								`<p>`,
								Spoken(S.Concubine, `"I told you it wouldn't work, ${Master}. Plus you know you can touch these anytime!"`),
								`${S.Concubine.slaveName} shakes ${his} chest at you.</p>`
							);
						}
					} else {
						if (FCTV.channelCount(11, 1, 'gt')) {
							r.push(`You could always order a crate to play around with. Who knows, maybe it'll actually work?`);
							if (V.PC.dick !== 0) {
								r.push(`At the very least it should make for some decent lubricant for a titfuck.`);
							}
						} else {
							r.push(`You could always order a crate to play around with. Who knows, maybe it'll actually work?`);
							if (V.PC.dick !== 0) {
								r.push(`At the very least it should make for some decent lubricant for a titfuck.`);
							}
							if (S.Concubine) {
								r.push(`</p><p>`);
								if (S.Concubine.boobs > 2000 && S.Concubine.boobShape === "saggy") {
									r.push(S.Concubine.slaveName);
									if (hasAnyArms(S.Concubine)) {
										r.push(`hefts`);
									} else {
										r.push(`shakes`);
									}
									r.push(`${his} breasts and lets them flop back into their usual saggy position.`);
									if (canTalk(S.Concubine)) {
										r.push(Spoken(S.Concubine, `<p>"Far too late for these ladies. I doubt it will work though, products like that never do."</p>`));
									} else {
										r.push(`<p>${He} sighs doubtfully.</p>`);
									}
								} else if (S.Concubine.boobs > 2000) {
									r.push(`${S.Concubine.slaveName} massages ${his} big breasts.<p>`);
									if (canTalk(S.Concubine)) {
										r.push(Spoken(S.Concubine, `"I doubt it will work, but if you're looking for an excuse, you don't need one!"`));
									} else {
										r.push(`${He} scoffs at the commercial and clearly expresses ${his} doubt before puffing out ${his} chest at you.`);
									}
									r.push(`</p><p>${He} leans into you so ${his} bust flops into your lap.</p>`);
								} else {
									r.push(S.Concubine.slaveName);
									if (hasAnyArms(S.Concubine)) {
										r.push(`cups`);
									} else {
										r.push(`considers`);
									}
									r.push(`${his} breasts.</p><p>`);
									if (canTalk(S.Concubine)) {
										r.push(Spoken(S.Concubine, `"What a joke. I'm sure it doesn't work, plus don't you think they are lovely enough already, ${Master}?"`));
									} else {
										r.push(`${He} scoffs with doubt before proudly sticking out ${his} chest.`);
									}
									r.push(`</p><p>${He} bounces ${his} tits for you. You'll have to agree with ${him}; not a bit of sag to them.`);
								}
								if (V.PC.boobs >= 1400 && V.PC.boobsImplant === 0) {
									r.push(`${He} slides closer to you,`);
									if (hasAnyArms(S.Concubine)) {
										r.push(`wraps`);
										if (hasBothArms(S.Concubine)) {
											r.push(`an`);
										} else {
											r.push(`${his}`);
										}
										r.push(`arm around your back, and grabs`);
									} else {
										r.push(`pushing ${his} head against`);
									}
									r.push(`your huge breasts.</p><p>`);
									if (canTalk(S.Concubine)) {
										r.push(Spoken(S.Concubine, `"Oh ${Master}! It feels like YOU might need it!"</p>`));
									} else {
										r.push(`${He} nuzzles further into your rack.</p>`);
									}
									if (hasAnyArms(S.Concubine)) {
										r.push(`${He} jiggles your boobs in ${his}`);
										if (hasBothArms(S.Concubine)) {
											r.push(`hands.`);
										} else {
											r.push(`hand.`);
										}
									}
									if (!canTalk(S.Concubine)) {
										r.push(`${He}'s calling you saggy!`);
									}
								}
								r.push(`<p>You take that as an open invitation and throw the covers over the two of you so you can have a little fun before bed.</p>`);
							} else if (V.PC.boobs >= 1400 && V.PC.boobsImplant === 0) {
								r.push(`You cup your huge breasts. They're pretty large and you swear they've been drooping a little lately; maybe you could benefit from this cream...`);
							}
						}
						r.push(`</p><div id="called">`);
						r.push(App.UI.link(
							"Place an order",
							() => {
								V.purchasedSagBGone = 1;
								cashX(forceNeg(Math.trunc(50 * V.upgradeMultiplierTrade)), "PCmedical");
								jQuery("#called").empty().append('Your order should arrive by next week. If the advertisement is to be believed, all you need to do is rub the cream into your breasts several times a day and it will ward off sagging.');
							}
						));
						r.push(`<i>This will cost ${cashFormat(Math.trunc(50 * V.upgradeMultiplierTrade))}</i></div>`);
					}

					return r.join(" ");
				}
			},
		]
	}],
	[12, {// drama series about a girl
		tags: {loli: true, incest: true},
		loop: true,
		get intro() {
			if (FCTV.channelCount(12, 1)) {
				return `currently airing a drama series about a girl adapting to living in the Free Cities. `;
			} else {
				return `currently airing another episode of that drama series. `;
			}
		},
		episode: [
			{
				get text() {
					const r = [];
					r.push(`For a moment you consider changing the channel, but you decide to give it a shot.`);
					r.push(`<p>The woman posed in the mirror. She was tall for a woman, fair skinned, and wore a keyhole sweater dress. Her scarlet hair was done in a braid down her back and her plump lips were covered in ruby red lipstick. She was slender, but not intolerably so; at the very least, she filled out her dress enough to avoid being arrested for indecency. All in all, the woman's reflection made for a pleasant picture. The only thing detracting from this scene was her glare.</p>`);
					r.push(`<p>"Hey Scott, do you have anything a bit more conservative?" The woman asked. "We've been over this." Scott said. "Not showing off your breasts is seen as very rude here." Scott frowned, "Well, that's not entirely correct, but it is seen as distinctly unfriendly; the only girls who don't show some cleavage are frigid cunts and old-worlders fresh off the boat."</p>`);
					r.push(`<p>The woman kept glaring in the mirror. "I understand that, but what is the point of this?" she said, pulling at the slits in the fabric at her sides. "Oh, those are for girls who want get milked on-the-go and not disrupt the view of their cleavage. Also, for this." The man said as he reached through the slits to give her breasts a polite squeeze.</p>`);
					r.push(`<p>The woman wriggled out of the man's grasp and turned to face him. She attempted to cross her arms across her chest in a protective fashion, but all she managed to do was make her breasts bulge enticingly. Scott sighed and pinched the bridge of his nose, "You really need to work on that." he said. She just glared at him. "I'll never be able to take you out in public, much less find you a job, if you keep acting like that when people try to greet you."</p>`);
					r.push(`<p>The woman huffed and turned back to continue glaring at the mirror. "Don't you huff at me young lady." Scott said, his face a stern mask. "If someone doesn't give you a squeeze or press breasts with you the first time you meet, it doesn't mean that they hold your beloved old-world values, it means they're snubbing you." The woman wilted at his words and turned around, opening her mouth to speak.</p>`);
					r.push(`<p>Any response died on her lips as a little golden haired girl bounced into the room. She wore a thong printed with cartoon cows and nothing else. An old-worlder would say the girl looked 'absurd' or 'cartoonishly proportioned', an arcology citizen would say the old-worlder looked like they needed some cheap tooth removal. In the girl's arms she carried a bundle of clothing. "Daddy, I got more clothes for Cathy." The little girl said, presenting the bundle.</p>`);
					r.push(`<p>Scott's face softened and gave the little girl's breasts a gentle squeeze before taking the bundle. "Thank you, sweetheart." He said before presenting the bundle to Cathy. His daughter beamed and then jiggled over to sit on the love seat across from the mirror. He followed her to the love seat, sat down, and lifted her on to his lap. She squealed and giggled before wiggling her bottom on his crotch. The girl grabbed her father's hands and guided them to her breasts. Scott obligingly started groping her. Cathy just stared at the bundle with such intensity one might think she was trying to force the clothes to change into jeans and a hoodie with force of will alone. "Go try it on," Scott said. Cathy sighed, walked into the adjacent bathroom, and closed the door.</p>`);
					r.push(`<p>"Daddy, why does Cathy have to leave when she changes clothes?" the little girl questioned. Scott continued groping his daughter and thought for a moment before replying. "Sarah, Cathy comes from a very different place and they do things differently there. From her perspective, she is a stranger in an even stranger land." He gave Sarah's breasts a firm squeeze before continuing. "She'll do things that will confuse and irritate you, but I want you to keep being patient with her, okay? "</p>`);
					r.push(`<p>After a moment, she nodded her head and begrudgingly said, "Okay". Scott smiled at his daughter and kissed the crown of her head before giving her another firm squeeze. "Thank you, sweetheart." Scott grinned and his voice took on a tone that only a parent can manage. "Hey, who's my cuddly moo cow?" Sarah blushed, but said nothing. "Who's my cuddly moo cow?" he asked again, his tone reaching diabetes inducing levels. "I am," she said softly. "You are!" he declared before giving her breasts a jiggle and another kiss on her crown.</p>`);
					r.push(`<p>A moment past in companionable silence before Scott remembered something. "Hey sweetheart, why didn't Sadie come back with you?" Sarah made a sound of surprise and said, "Oh, mommy got a bit drippy getting into her exo and needed Sadie for licky. Mommy also wants you to pound her boobies after you're done with Cathy."</p>`);
					r.push(`<p>"Alright, June will help you take care of your morning milkies while Sadie and I tend to your mother," he said. "But I wanna watch!" she pleaded. He shook his head and said, "You need to have your milkies and mommy's going to use the bedroom milker, so you're going to use the one in the kitchen." "I can use my backpack milker," she said quickly. He gave her a look and his voice took on a wry tone. "Weren't you just telling me that your milker is old and we need to get you a new one? I guess you'll have to wait until then." Sarah looked up at her father, unshed tears in her eyes. "Please?" she pleaded. Scott sighed deeply and said, "Alright, go get your milker after we're done here." Sarah gave her father a sunny smile and cheered.</p>`);
					r.push(`<p>Scott called out to Cathy, "Come on out and give us a look!" The door to the bathroom opened and Cathy stepped out, tugging at her skirt. The clothing was a simple blouse and skirt affair with a Holstein pattern. In truth, it didn't look like something that would offend old world sensibilities, except for the fact the skirt was so short that her frilly panties were in plain view.</p>`);
					r.push(`<p>"Do you have a skirt that's a little longer?" Cathy said and tugged at her skirt again. "It's supposed to look like that." Scott explained. Cathy looked skeptical. "Really?" she asked. Sarah gave Cathy a look that asked if she really was that stupid. "Why would you wear pretty panties and never show anyone?" She asked rhetorically. Cathy started on a hot retort, but was interrupted by Scott. "We'll stop for now and pick this up later. You can put your new clothes away." Cathy sighed, picked up her clothes, and walked out the door.</p>`);
					r.push(`<p>Scott stood up and set his daughter on her feet. She turned her back to her father, bent over slightly, and wiggled her bottom meaningfully. Scott smacked her right butt cheek and said, "Off you go." Sarah didn't move. "Daddy," she said pleadingly and wiggled her bottom again. He smacked her left butt cheek. She giggled happily and jiggled out the door. Scott smiled at his daughter's antics, shook his head, and made his way to his bedroom.</p>`);
					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`<p>On his way to the bedroom he passed through the kitchen and caught sight of June preparing lunch. She was tall for a woman. Her hair was a golden blonde and her figure spoke of her ongoing romance with growth drugs. She wore a black thong and an apron embroidered with the words 'Milk the cook', which was rather strange, considering she normally wore her 'Rape the cook' apron on Saturdays. But he guessed she was still raw from last night.</p>`);
					r.push(`<p>He came up behind her and reached into her apron to give her breasts a squeeze. June made a sound of pleasure in response. "Hello master, are you finished with Cathy for today?" He set his chin on the top of her head. "For the moment. After I've tended to Annie and had lunch, I think I'll take Cathy out for a bit. Maybe take the whole family out for ice cream."</p>`);
					r.push(`<p>June paused for a moment. "You think she's ready? She still seems rather... willful." She said uncertainly. He gave her breasts a comforting squeeze. "Cathy may be a bit hardheaded, but I don't think she'll make too much of a scene with me there. And besides, I think it's time she had a taste of the local culture. There's not much of a point in teaching her etiquette if she freaks out at every Lactation Station."</p>`);
					r.push(`<p>She still looked somewhat uncertain, but nodded her head. "Whatever you think is best, master." Scott kissed the crown of her head and said, "Don't worry about it. It'll be fine. I'm not throwing her in the deep end yet." He gave her breasts a reassuring squeeze, gave both of her ass cheeks a quick slap and made his way to the bedroom.</p>`);
					r.push(`<p>As he stepped into the bedroom a breathy voice called out him. "Howdy there, stranger. Say, could you help me out with a little something?" She had the same blonde hair and blue eyes of her daughter. Her face could be called angelic, but her expression changed her visage into that of a lustful succubus. Truly, she could inspire awe and lust in old-worlders and citizens of the Free Cities alike. However, her figure would prove more divisive.</p>`);
					r.push(`<p>Annie had a body that could give ancient fertility idols an inferiority complex. Some would say she was more boob than woman; she would say their description, while true, was woefully inadequate. Without her exosuit, she wouldn't be able to kneel on the bed, let alone stand, and without the suit's smart material supporting her breasts Scott wouldn't be able to see Sadie's blonde head poke out between Annie's thighs.</p>`);
					r.push(`<p>Scott gestured to Sadie "It looks like you're already in good hands." A teasing grin spread across his face. "What could little old me do for you?" Annie gave him a knowing look and presented her well-lubricated cleavage. "Oh, I'm sure you could find something." Any response from Scott was interrupted by a young voice from the bathroom saying "I found more of the strawberry lube."</p>`);
					r.push(`<p>For a moment, the only sounds in the room were the soft 'whir' of a milker and the muffled hum of Sadie's vibrator. Annie's breath hitched from Sadie's ministrations and responded, "That's good sweetie, bring it here." The door to the bathroom swung open and Sarah walked into the room. She had lost her thong and was wearing a backpack printed with cartoon farm animals. Flexible tubing snaked out of the pack and attached two cups on her breasts. In her hands was a bottle of edible lube and a bright pink rounded cylinder with the words 'Her First Vibrator' printed in a saccharine font on the base.</p>`);
					r.push(`<p>Sarah looked at both her parents, then tilted her head and frowned. "You and daddy were playing that weird game again, weren't you?" Scott and Annie looked at each other; silently communicating in a way only parents can. Annie looked at her daughter and said, "When you're a bit older you're going to want to play those games too." Sarah looked unconvinced. "Anyway, you got the lube, are both your milker and vibrator charged?" Annie asked. Sarah bobbed her head. "Then why don't you lube up daddy?" Sarah bobbed her head again and knelt at the side of the bed.</p>`);
					r.push(`<p>Scott quickly undressed and sat at the edge of the bed. Sarah knelt between her father's legs. She begins softly licking her father's cock, her tongue sliding along its length and gently swirling around its head, her mouth making lewd noises. She runs her tongue on the underside of her dad's cock, taking him into her mouth and beginning to give him a slow blowjob.</p>`);
					r.push(`<p>Scott felt himself slowly harden to full mast. He resisted the urge to pull her down till her nose touched his crotch and said, "That's good sweetheart, now use the lube." Sarah pulled herself off his cock with a lewd pop and picked up the bottle of lube. She squirted a generous amount of it into one hand, rubbed both hands together, and began to stroke his cock. "You're doing a good job sweetie, did you help mommy too?" he asked. Annie nodded "She did a very good job and was very thorough." Sarah preened at her parents' praise and said, "It wasn't easy. I had to use a whole bottle to do mommy." Scott turned his head to his wife and raised an eyebrow. Annie gave him a lewd grin and her blush slowly spread down her chest, but said nothing.</p>`);
					r.push(`<p>Scott patted his daughter's head. "Okay sweetie, take a seat." Sarah gave her dad's cock a kiss on the head, grabbed her vibrator and sat down on the couch across from the bed. She rubbed the lube on her hands over her crotch and her vibrator before licking off what remained. Scott began to stand, but paused; an impish smile spread across his face. "Before we begin, I have a question for mommy." He reached into a night table and pulled out an odd remote and a Wartenberg pinwheel.</p>`);
					r.push(`<p>"Oh, and what would that be?" Annie said in a knowing tone, her eyes twinkling. Scott just grinned and pressed a button on the remote. Annie squealed as her exosuit shifted her forward onto her breasts. Scott craned his head to look behind wife. "You alright down there, Sadie?" He cocked his head a bit more and barely made out a thumbs up beyond the horizon of his wife's ass. "Good. Now-" He rolled the pinwheel across her arm to collar bone and Annie gasped. "Why did you ask Sadie to stay behind when I sent her off for clothes?"</p>`);
					r.push(`<p>Annie inhaled sharply and said, "I needed to cum." He ran the pinwheel slowly down her collarbone to her breast. "And what had you so worked up you needed Sadie?" Her breathing began to speed up. "I nearly threw my back out getting into my exo." He raised an eyebrow and ran the pinwheel in winding loops across her breasts, goose bumps forming in its wake. "Oh? And why would that get you so hot and bothered?" he asked in a knowing tone.</p>`);
					r.push(`<p>Annie's breath became more ragged and began to babble. "I'm-I'm so big, so big. I'm a breast obsessed cowslut." She held the smart material of her exo in a white knuckle grip. "I came when I couldn't see my feet anymore. I masturbated seven times when I first got stuck in a door. I once wrapped my tits around a guard rail and humped it for three hours. I came buckets to the look on Cathy's face when she met me." Annie gave him a look of pure want. "I need to cum. Mommy needs her boobs pounded," she pleaded. Scott smiled and pressed a button on the remote that caused the smart material to press Annie's breasts into a fuckable channel. He positioned himself and said, "Honesty is to be rewarded," then thrust himself into her.</p>`);
					r.push(`<p>She gasped and moaned loudly. Her mewling was almost loud enough to match the lewd noises of flesh against flesh. Scott began to increase his speed, with each thrust sending ripples through her body. With how worked up she was, it wasn't long before her moaning increased in volume until she suddenly gasped, her body tensed up, shuddered and then relaxed. Annie's tongue lolled out and her eyes fluttered.</p>`);
					r.push(`<p>Scott snorted in amusement and was about to continue when he felt a tongue licking him. He looked down to see Sarah. She looked at him with pleading eyes "Daddy, I need it." Scott sighed, but smiled softly at his daughter and said, "Okay, how do you want it?" She thought for a second before saying, "I want puss-puss." He nodded, picked her up and laid his daughter atop his wife's vast breasts.</p>`);
					r.push(`<p>He teased himself against her cunny and then began to ease himself into her. She gasped at the intrusion and began to tease her own nipples, milk slowly leaking out of them. As he eased into her tight cunny, he could feel his own orgasm building. He paused for a moment and then began to move. It didn't take long for his orgasm to build again. He increased the speed of his thrusts until he came inside his daughter. He continued until she tensed, her breasts spraying milk violently, and fell limp.</p>`);
					r.push(`<p>Scott leaned into his wife's breasts to bask in the afterglow. While Annie had coaxed Sarah to turn around, pulled Sarah's cunny to her face and began to slowly eat her daughter out. Sarah just lay bonelessly atop her mother's breasts.</p>`);
					r.push(`<p>Scott just enjoyed the sight of mother-daughter bonding for a while before recalling his earlier plans. "I was thinking of taking the family out for ice cream after lunch." Annie made a pleased sound as she continued licking her daughter's cunny, Sarah cheered lazily, Sadie's legs wiggled with what could be called excitement.</p>`);
					r.push(`<p>"I was also thinking of taking Cathy with us." Annie stopped sucking on her daughter's clit to frown at him. He made a placating gesture and said, "She won't make a big scene with all of us there, and besides, you enjoy it when she has a mini freak out." She paused to think for a moment, then said, "You have cameras and a drone on her, right?" He nodded. "I want copies." She gave him a lusty grin before returning to her meal. He turned Sarah. "I wanna bloom berry sundae with bottom boost sprinkles." He nodded, hooked his head to look behind his wife and said, "How about you Sadie?" The hand that poked out from behind his wife waggled uncertainly, but ultimately became a thumbs up.</p>`);

					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`<p>After a light lunch, the family assembled in the entry hall. Sarah rode in her mother's cleavage, playing with a tablet as they waited on Cathy. When Cathy made her way into the hall Scott frowned at her. "You're not going out dressed like that." Cathy looked down at herself. "What's wrong with this? This shows off my body well enough, right?"</p>`);
					r.push(`<p>She wore jeans and a T-shirt made a few sizes too small by her regimen of growth drug. "Why don't you put on that bikini I gave you?" Cathy just furrowed her brow and said nothing. Scott sighed and said, "Just don't wear pants and show some cleavage. For god's sake, people show more skin at funerals than you do." Cathy frowned, but went back to change. When she came back she was wearing the Holstein pattern skirt and blouse he had given her earlier. "You're going to wear that?" he asked. "What's wrong now?" He raised his hands in a placating gesture. "Nothing, nothing. Let's go."</p>`);
					r.push(`<p>The family left, made their way to an elevator and rode it down a few floors before exiting. As they turned the corner onto the street, the creamery came into sight. The family continued onward until Sarah spoke up. "Daddy, where's Cathy?" Scott looked back and saw that Cathy had stopped walking a few`);
					if (V.showInches === 2) {
						r.push(`feet`);
					} else {
						r.push(`meters`);
					}
					r.push(`back. She stood staring wide eyed at the creamery.</p>`);
					r.push(`<p>The LCD screen above the entrance wasn't anything too eye catching. It proudly displayed the words Blue Barn Creamery & Grocery in bright letters. An ever changing list of advertisements and new products on sale scrolled along the bottom. Truly, it could have fit in with old world signs if no one looked too closely at the words on screen. What was truly eye-catching is what surrounded it.</p>`);
					r.push(`<p>Dozens of cowslaves mounted in milking frames surrounded the screen up and down the building. The building curved out to dangle slaves into the street. Whoever created the display had been thoughtful enough to arrange the cowslaves in order of pregnancy, from flat bellies at the top to the monstrously pregnant at the bottom.</p>`);
					r.push(`<p>Scott walked back to Cathy grabbed her hand. "Come along." He managed to get a dozen paces before she pulled her hand out of his grasp. "Those are people," she hissed under her breath. "Of course they're people. What did you think they were, animatronics?" he scoffed. "This isn't Yellow Farmhouse." He shook his head. "Honestly, what were they thinking?"</p>`);
					r.push(`<p>She sputtered and fumed at him for a moment before she found her voice again. "That isn't what I meant and you know it." She turned away from him to take in the scene. A dark haired beauty with smoky eyes amongst the cowslaves above caught her eye and gave her a lewd grin or, rather, attempted to do so around the feeding dildo in her mouth. Cathy wrinkled her nose. "Why would people do this?"</p>`);
					r.push(`<p>"Well, at Blue Barn Creamery they believe customers have the right to see the cow before they drink from it." He answered in a wry tone. "But never mind that, let's go." He gave her butt a quick slap and continued walking. She winced at the impact, but followed him, her eyes still on the display.</p>`);
					r.push(`<p>After a moment, her features slowly shifted from disgust to morbid curiosity. "What happens when they need to give birth?" Scott beamed at her. "You can't see it, but those platforms have systems that allow them to give birth without removing them and after giving birth they can be easily moved back to the top." He said gesturing to the slaves. "Blue Barn also offers an app that allows you to follow a slave's pregnancy and insemination."</p>`);
					r.push(`<p>As they approached the entrance to the creamery, a crowd began to form around it. Slaves with the Blue Barn logo tattooed on their cheek passed out cups to the crowd. Scott and Cathy rejoined the family as June was gathering cups for everyone. "Everything alright?" Annie asked, an odd twinkle in her eye. "Nothing to worry about." Scott said as June gave him and Cathy their cups.</p>`);
					r.push(`<p>Cathy looked at the cup in confusion. "Shouldn't we head inside?" Scott just gave her a small smile. "Not just yet." An aura of excitement began to build in the crowd. She noticed that most of the crowd wore very little. Most of the women wore underwear or jewelry and nothing else. Cathy just stared at her cup and then looked up and noticed something she'd missed before. A countdown timer in the corner of the creamery's screen. And it had just hit zero.</p>`);
					r.push(`<p>The cowslaves mounted above began to moan and a deluge of milk flowed onto the crowd. The crowd cheered and laughed raising their cups high. Some of the women just basked in the spray, rubbing the milk into their skin. Some of the younger children danced and jumped in the puddles that formed.</p>`);
					r.push(`<p>While others were reveling in the downpour, Cathy just stood still, exuding the aura of a wet cat. Scott laughed at Cathy's put-out expression and took another swig from his cup. "Now we can go in."</p>`);

					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`<p>A soft gust of air flowed over the family as they passed through the doors to the creamery. Compared to its outward appearance, the creamery's interior was rather rustic. The warmly colored wood and soft amber lighting gave it a close and homey feel, like walking into an old ranch home at sunset.</p>`);
					r.push(`<p>The family passed wooden stalls containing a bevy of cowslaves. Each stall had a plaque with the slave's name on it, milking lines snaked down from the ceiling, and above each stall was a screen displaying the cow's sexual exploits. Some of them were chatting with customers, taking selfies with them and recommending products to try. Others were providing more intimate services to their clientele or simply milking themselves and staring at passersby, their smoldering eyes and flushed faces promising every earthly delight one could imagine. Cathy did her best to ignore the goings on around her and focus her attention forward, but couldn't help herself from taking short peeks from the corner of her eye.</p>`);
					r.push(`<p>Eventually, the family came to a stop at a dessert counter. Various cakes, pastries, and other treats tempted customers from behind the glass. Each dessert had stylized pictures of the cows that provided the ingredients. One particularly large cake had a picture of adorably deformed and scantily clad construction crew building the cake in a clumsy, but earnest fashion. Above the counter was a series of chalk boards that listed products on the menu, as well as boasting of the day's specials. On top of the counter was a single silver bell. Annie sidled up to the counter, her breasts pressing into the glass. Her daughter reached over from her perch and rung the bell. They didn't have to wait for long before a voice called out to them. "Oh, master! I didn't know you were coming in today."</p>`);
					r.push(`<p>She was relatively short for a woman, with dark hair and warm brown eyes. Her figure spoke of a long romance with growth drugs and an ongoing affair with the contents of the dessert counter. She wore a slutty maid uniform, tubes snaking out the slits at her breasts to her backpack, and what looked like a modified soda gun was holstered at her hip. The upper slope of her right breast was tattooed with loopy script that said Martha.</p>`);
					r.push(`<p>Scott smiled and gave her a polite grope. "Just a little family outing. Could you get us a table?" He glanced at Cathy for a moment. "And maybe a few towels?" Martha grinned and said, "Sure thing." She disappeared behind the counter and returned with fluffy towels and menus in hand. After handing out the towels, she said, "Alright, follow me" and lead the family away.</p>`);
					r.push(`<p>Martha led them to table that, despite being designed with more generous figures in mind, groaned when Annie sat down. The waitress passed out menus as the family busied themselves with drying off. After passing out the menus, Martha gave a quick, "Be back in a sec." and walked away. As the family finished up drying off, Martha returned with a tray of empty glasses. She set out the glasses on the table, unholstered the soda gun at her hip, and began to fill them up.</p>`);
					r.push(`<p>Cathy just stared at the glass of milk in front of her. "It's pink." Annie handed her daughter a glass before taking a sip from her own. "And quite delicious, you should give it a try, Kitten." Sarah licked off her milk mustache and nodded, "Uh-huh, you should give it a try before you say you don't like it." Cathy took a tentative sip and then looked at her glass with new eyes. "It's strawberry flavored, how does that work?"</p>`);
					r.push(`<p>Scott patted Martha's breasts. "A bit of minor surgery and a regimen of various supplements. If you go upstairs you can buy drugs that do the much the same thing, if less effectively." Scott took drink from his glass before continuing. "A side benefit of research performed on behalf of the vampires of Sanguine." Cathy looked skeptical. "Vampires?" she asked. Scott waved his hand. "I'll tell you about them another time."</p>`);
					r.push(`<p>Martha pulled a small notepad out of her cleavage. "Do you folks know what you want or do you need some time?" Scott thought for a second before responding. "Why don't you give us a moment, It's Cathy's first time here." She beamed at Cathy. "Oh, glad to have you here! I hope you enjoy yourself, darlin'." She took a slender remote out of her cleavage and handed it to Cathy. "Give me a buzz when you've made up your mind." With a small wave, Martha turned sashayed away.</p>`);
					r.push(`<p>Cathy turned her attention to the menu in front of her. At a distance it didn't appear to be any different from a normal paper menu, but on closer inspection one could see it was a flexible touch screen. Scrolling down each page revealed a variety of intriguing dishes as cartoon cowslaves danced in the margins. Tapping on a dish opened a window that showed a video of the item; beside the window was a tab that enticed customers to see the cows in action. A significant part of the dessert page was dedicated extolling the virtues of growth drug laced ice cream produced by Blue Barn's partnership with Bloom Pharma. Below this were animations of cows eating ice cream and suddenly growing assets of immense size.</p>`);
					r.push(`<p>"Hmm, anyone know what they want?" Scott asked. June looked up from the menu. "I think I'll get my usual." Sadie yawned and said, "Same." Sarah held up her menu, jabbing finger at a picture of a black forest cake and said, "I want this." While the cake quite impressive, to the right of it was something far more attention grabbing.</p>`);
					r.push(`<p>A window had opened and was playing a video of the cows that helped produce the cake. A heavily pregnant cowslave was railing a far younger, but equally as pregnant cow with a strap-on. The younger cow's eyes were glassy and unfocused. The older slave let out a growl of need and began to pick up speed, their considerable breasts jiggling with each thrust. The menu was polite enough to have a blurb informing them that the cows are actresses on The Young and the Fecund. If one was feeling uncharitable, they could say that the sole video tag of "lactating lolis" was technically correct, but a woefully inadequate description.</p>`);
					r.push(`<p>He raised an eyebrow. "I thought you wanted a bloom berry sundae?" She gave him puppy dog eyes. "I want cake too," she whined. He narrowed his eyes at her. The puppy dog eyes increased in intensity. A moment passed before he caved. "You can have a small slice." The puppy dog eyes vanished and she let out a small cheer. Annie set down her menu. "I think I'll have rum raisin —" She smiled at him, her eyes crinkling. "— and a slice of cake." He huffed at her, but smiled anyway. Then he turned to Cathy. "And you?" he asked. "I think I'll have a vanilla sundae." He cocked his head at her and raised an eyebrow. "What?" she said defensively. He held up his hands in a placating gesture. "Nothing, nothing. If you've made up your mind, just use the remote." She picked up the remote and pressed the call button.</p>`);
					r.push(`<p>A few moments later, Martha returned, her face flushed. "Everyone all set?" She briskly took down their orders and set off for the kitchens. After a few minutes, she returned with a full tray. With an agility that only comes from years of being a fighter pilot or working in the food industry, she passed out their orders and topped off every glass. With a quick, "Buzz me if you need me," Martha returned to the counter.</p>`);
					r.push(`<p>June demurely ate her ice cream while Sadie seemed intent on eating her banana split in as lewd a fashion possible. In stark contrast, Sarah was savaging her cake and ice cream, icing smearing on her face and chest. As Annie was eating her ice cream, she 'accidentally' started dribbling onto her cleavage. "Oh my!" she said in a tone of faux concern. "Sweetie, could you help mommy out?" Sarah wiggled around in her mother's cleavage and began to lap up the drips of ice cream, leaving smears of icing in her wake. "Oh, you've such a messy eater. Come here and let mommy clean you up." Annie pulled her close and began to lick the remnants of cake and ice cream off her face. Her licks slowly morphed into a deep kiss. Their tongues danced and faces flushed. Annie pulled away from her, trailing a line of kisses down her chest and began to suckle from her. Sarah bit her lip, closed her eyes, and began to moan, her fingers teasing her clit.</p>`);
					r.push(`<p>Cathy looked upon this scene with an expression that could only be charitably described as slack-jawed. Scott caught her eye and gave her an amused grin. She flushed with embarrassment and cleared her throat before asking, "So, you own this place, don't you?" He took a lick of his ice cream. "Indeed I do. Something you want to ask?"</p>`);
					r.push(`<p>Her features became troubled and she shifted in her seat. "Yeah, why do you have all those girls mounted out front?" He shrugged his shoulders. "Like I said, we at Blue Barn Creamery believe the customer has a right to see the cow before they drink from it." She nodded "Yeah you said that, but why? Wouldn't putting up a bunch of screens be as effective?"</p>`);
					r.push(`<p>Scott pondered her question for a moment, before saying, "Shortly after starting up here, there was a big scandal over slave milk. Apparently, some moron thought adulterating slave milk with actual cow milk was a good idea. As you might guess, it didn't turn out well for him." He took a bite of his ice cream before continuing. "After that, customer trust was at an all-time low. So, I decided to make sure customers could see the whole process right outside the door." He jabbed his cone at her. "That level of transparency made me quite rich and my cows famous. Upstairs, you can buy all sorts of merchandise based on them: clothes, dolls, you name it." He smiled. "There's even a cartoon in the works." Cathy looked at him with a thoughtful expression. "So, that's why?" He gave her a lewd grin. "That, and it's quite sexy. Now, eat your ice cream before it melts." He turned to his wife and daughter. "That goes for you too. Remember, clean your plate, then masturbate." Sarah pulled away from Annie, gobbled down what remained of her food, and then pressed her breasts into her mother's face.</p>`);
					r.push(`<p>A few minutes later, the family had finished their ice cream and were taking a moment to relax. Sarah rested languidly in her mother's cleavage, basking in the afterglow. Annie shifted uncomfortably. "Feeling pretty sticky. I think mommy is going to go home and take a shower." Scott patted her breast. "Sounds good, I think June and I'll get some shopping done and head back." At the word 'shopping,' Sarah immediately said, "No spinach." Scott looked at his daughter. "Yes spinach. You're not going to grow up to be big and milky like mommy if you don't eat your greens." Sarah pouted and mumbled into her mother's breast, "I want lolimommy cheese curds and a new plushy." Scott ruffled her hair. "We'll see."</p>`);
					r.push(`<p>As the family gathered themselves, Cathy held up the remote. "Should we just leave this at the counter?" Annie smiled at her. "Why don't you give her a buzz? I'm sure she'd like it." Cathy gave her a confused frown. Annie sighed and asked, "Kitten, how do you think that gets her attention?" Cathy turned the remote over in her hands. "She would have something that blinked and vibrated when someone used the remote." Annie just looked at her with a serene smile, her eyes twinkling mischievously. With a sudden gasp, Cathy dropped the remote like it had shocked her. A second later, there was a distant squeal and the clatter of a tray hitting the floor.</p>`);

					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`<p>A moment later, a beet red Cathy was stuttering an apology to an even redder Martha. "Don't worry about it, it was just a pleasant surprise." She smiled and pressed her breasts against Cathy's. "Hope to see you 'round soon darlin'." Martha pulled her into a hug and whispered softly into her ear. "I know it's hard to adjust to, but I think you'll do just fine here." She pressed a piece of paper into Cathy's cleavage and sashayed away.</p>`);
					r.push(`<p>Cathy fished it out to see it was an email and phone number with a lip print in bright red lipstick. "Oh my," Annie said, her eyes dancing with amusement. "It looks like you've made a friend." She turned to her husband and said, "I think they'd make a cute couple, wouldn't you?" Scott examined Cathy for a second before nodding. "So long as she makes an honest woman out of her, she has my blessing." Cathy just slowly fumed, her face scarlet in embarrassment. A moment passed before Annie couldn't take it anymore and let out loud, breast quaking, laughter.</p>`);
					r.push(`<p>Cathy glared at Annie. "She was just being friendly." This just sent Annie into another fit of bosom shaking hysterics. Scott attempted to steady his wife. "Cathy, do you remember the remote she gave you?" She nodded warily. "You don't need one of those to call a waitress. The menus have a button that calls the nearest one to the table," he explained. "Remotes like that are typically reserved for VIPs or favored customers." Her brow furrowed. "But you're the owner! Why wouldn't she leave one with you?" He gave her a small grin and said, "Indeed I am, but she gave the remote to you, not me." Cathy thought that over for a second before putting her head in her hands and sulked.</p>`);
					r.push(`<p>After a few seconds, Annie's laughter had died down to jiggling chortles. She wiped a tear from her eye, smiled and said, "Oh dear sweet kitten, never change." The chortling slowed and so did the wobbling of her bosom.</p>`);
					r.push(`<p>Finally, she let out a long relaxed sigh before saying, "On that note, I think it's time to head back. Coming, Sadie?" Sadie nodded and took up a position beside Annie. They linked arms and presented their bottoms to Scott. He gave both their asses a quick smack and said, "Off you go." Annie wiggled her bottom. "Daddy," she whined plaintively, her eyes bright with amusement. He sighed good-naturedly and gave both her cheeks a solid smack. She squealed and tittered, her eyes twinkling, then wobbled to the door and out of sight.</p>`);
					r.push(`<p>The party made their way to an elevator past the dessert counter and went up a floor. The grocery portion of Blue Barn had much the same aesthetic as downstairs: all cedar and oak construction, and pendant lamps hanging above. The hardwood floor was polished in the way only an obsessive-compulsive could manage. Immediately out of the elevator were lines of wooden shelves and tables bearing Blue Barn merchandise.</p>`);
					r.push(`<p>There were posters, coasters, clothing and all manner of little knickknacks, but the true star of the show were the plushies. Rows upon rows of them covered the shelves and tables arranged in little displays, all of them made in the image of cows working at the creamery. One table had the plushies in a mini concert hall, the ones on stage wielding toy instruments that had 'Press me!' stickers on them. Another table had them arranged in what looked to be a garden party. Spread across two tables was a diorama of the creamery with plushies placed throughout it. One plushie that looked distinctly like Martha was plopped behind the dessert counter. Another was placed near the elevators and if one looked closely they could see a matching cowslave sat drowsing amongst the merchandise.</p>`);
					r.push(`<p>The cow was young, busty, even for the arcology, and heavily pregnant. She wore what looked to be Holstein print pajamas with a hood made to look like a stylized cow. Her strawberry blonde hair was mussed with sleep and she cradled a plushie in one arm. Truly, she looked like a daughter waiting for her daddy to come home. As the party approached, she began to stir.</p>`);
					r.push(`<p>Scott reached out and began to gently pat her head. "How are you doing, Tabby?" Tabby just made a sound of contentment and pressed into his hand, luxuriating in his touch. After a few moments, she yawned and blinked, looking up at him. For a beat she just stared at him, her sleep-addled brain struggling to process the sight in front of her. Finally, the penny dropped.</p>`);
					r.push(`<p>She squeaked and sat up so quick one would think she had been hit with a cattle prod. With a panicked expression, she began to babble a fervent apology. "Master, I'm sorry I fell asleep." She hiccupped and pleaded with him, on the verge of tears. "Please don't tell Gabe I fell asleep again. She'll yell at me for sure." Scott just continued patting her head, knelt beside her chair, and spoke in a calm tone, "Hey, hey, no need for tears. Just take a deep breath and calm down Tabby cat. I won't tell Gabe."</p>`);
					r.push(`<p>Tabby sniffed, took a deep breath, and hiccupped. For a moment, she just relaxed into Scott's ministrations before she frowned and said, "I thought you weren't coming in today master." He moved her hair out her eyes. "I figured I'd get some shopping done and show the newbie around," he said with a nod to Cathy. Tabby gave her a bright smile. "Oh, nice to meet you. Would you like a free sample?" she asked gesturing to table next to her.</p>`);
					r.push(`<p>The table next to her held a platter of cheese curds. A sign with the words 'Free Samples' printed on it stood to the left of table. Someone apparently thought that was an insufficient description and had taken a pen to add the words 'I made them myself!' in bright pink letters. Next to the platter, was an empty package that said 'Lolimommy Cheese Curds' in a cheery font. On the package, was an adorably deformed picture of Tabby that said 'The fresh ones squeak'.</p>`);
					r.push(`<p>Scott grabbed a few cheese curds and said, "Don't mind if I do," before popping one in his mouth. He handed some to Cathy and June. While June ate hers placidly, Cathy just stared at the cheese uncertainly. Scott gave her a look that promised a sore bottom if she didn't eat it, while Tabby clasped her hands and gave Cathy a look that could only be described as adorably determined.</p>`);
					r.push(`<p>Cathy took a tentative bite before popping the rest into her mouth. "It's good." Tabby gave her a sunny smile and said, "Thank you! I worked really hard on them." Scott smiled at her fondly and patted her head, "Yes you did." She preened at his praise and let out a sigh of contentment.</p>`);
					r.push(`<p>A moment passed in companionable silence, before Scott noticed that Cathy was starting to get antsy. "Anyway, we're going to get some groceries and head on out." Tabby nodded, but couldn't hide her disappointment. "I'll come by tomorrow to check on you and talk to Gabe." He gave her a squeeze and fondly tousled her hair before heading further into the store, Cathy and June in tow.</p>`);
					r.push(`<p>They only made it a few paces before an impish gleam entered Scott's eye. He signaled the rest to wait before heading back to the merchandise tables and returned quickly with a pair of plushies in hand. He handed one to Cathy without breaking stride and continued into the store. Cathy looked at the plushie and saw that it was Martha. She sighed and despite her chagrin, clutched the doll to her chest and followed.</p>`);

					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`<p>By the time Cathy had caught up, June had procured a shopping cart and was making her way to the produce section. A variety of fruits and vegetables tempted passersby, all so enticing that one might think they had been pulled from the canvas of an oil painting. The produce was arranged in finely crafted wooden displays with small chalkboards bearing names and prices written in a tidy hand. Overall, it gave off a rustic charm, like stepping into a small town farmers' market. Detracting from this image somewhat, were a series of screens above the produce.</p>`);
					r.push(`<p>The screens displayed what looked like the inside of a greenhouse, although one could be forgiven for not realizing that right away. The LED lamps above gave off an odd magenta light turning the vast swaths of greenery a reddish-black. The odd hue gave the display a rather surreal look.</p>`);
					r.push(`<p>While June and Scott were inspecting the produce for freshness, Cathy paused to stare at the screens. "Those are live feeds from the greenhouses," June provided helpfully. Cathy nodded, but continued to stare at the screens, her brow furrowed in confusion. "I got that, but why is it kinda pink?" Scott held an orange to his nose and gave it a quick sniff. "The lights in the greenhouses only produce the wavelengths plants use for photosynthesis. Saves on power, stimulates growth and plant health." He placed the orange in his produce bag. "The carbon dioxide levels are about five times higher than normal in there too." He pressed some produce bags into her hand, "But enough about that, grab some spinach and get a little something for yourself while you're at it."</p>`);
					r.push(`<p>As she set about her task, a tray of succulent peaches caught her eye. Cathy made a beeline toward the fruits and attempted to sort out the logistics of filling her bag while her hands were full. After a moment of thought, she pressed her plushie into her cleavage and then began to load up on peaches. When she returned to the cart with her prize in hand, she caught Scott giving her a slight smile. She looked back at him perplexed until she followed his gaze. With lightning quickness, she snatched the plushie from its perch, turned away, and took an unusual interest in a large squash. He just chuckled softly.</p>`);
					r.push(`<p>Produce now acquired, the group continued on until they came to a deli counter. Beneath the glass was a cornucopia of comestibles. Various kinds of meat, both vat-grown and organic, were on display. Countless varieties of cheese were on offer, each possessing a stylized picture of the cows that provided the milk. A particular wheel of cheddar had a picture of a quartet of cows performing a thorough investigation of each other's tonsils while playing a game of hide the vibrator.</p>`);
					r.push(`<p>A stand next to the counter held a sign bearing a picture of a slave presenting her breasts to the viewer. The view of the slave's breasts was obscured by a synthetic pair attached to the sign. Above the picture were the words 'Tease for service'. Scott reached out and tweaked the nipples on the fake breasts and was rewarded with a distant squeak, followed by a soft voice calling out, "Coming!"</p>`);
					r.push(`<p>The slave appeared a second later, her face flushed. She was more cute than pretty, her figure somewhat petite compared to her coworkers. She wore her brown hair in a neat bun tucked under her hairnet. She wore the same lewd maid uniform as Martha and the name 'Beth' was written across the slope of her left breast.</p>`);
					r.push(`<p>A smile spread across Beth's face when she saw Scott. "Hey master, didn't expect ya." He returned her smile, "Just here to get a few things. Could I get my usual?" She gave him a quick nod and said, "Sure thing", before grabbing some salami and getting to work at the slicer. A few minutes later, she was wrapping up slices of various meats and cheeses and handed them to Scott. As he set the packages in the cart he remembered something, "Beth, could you tell Gabe I want to see her first thing tomorrow? "</p>`);
					r.push(`<p>A troubled expression crossed her face. She asked tentatively, "Tabby?" He nodded. "Tabby." She shook her head and let out a sigh. "Gabe's been giving it to us pretty hard, but she's really been railing Tabby lately." Her features gain a speculative look. "If I could give some advice?" Scott nodded. She leaned forward, pressing her breasts into the counter. "You could try knocking her up. She's getting towards that age where women start going baby crazy if they haven't already popped out a few. Could be why she's so hard on Tabby." She drummed out a little beat on the counter. "Alternatively, you could just smack her around a bit and see if that calms her down." She put a hand under her chin, her face thoughtful. "Although, if you do that you may have to make time to bend her over your knee." Cathy let out a sound of disgust. "What would hitting her solve?" Beth shrugged and said, "Sometimes a bitch needs a smack." A quick look from Scott silenced any retort from Cathy. "I'll see what I can do. See you tomorrow, Beth."</p>`);
					r.push(`<p>As they moved away from the deli, Scott pulled out an orange and began to fiddle with it. A moment later, Cathy spoke up, "I have to ask, why do you have a store like this?" He frowned at her, but encouraged her to continue. "I mean, space is at a premium here right? You could just have a website with your products and ship 'em to people." He nodded to her and said, "That's true, but it's not as expensive as you might think. And we do offer delivery through our app. If the customer lives in another arcology with Under Road access, they can get express delivery; provided that they're willing to stomach the expense."</p>`);
					r.push(`<p>He spun the orange in his hand, then pointed it at her for emphases. "But, you're looking at this from the wrong angle." Cathy tilted her head in curiosity as he continued. "While many people outside are content to eat cheap food delivered by drone, people here have more discerning tastes." With a flick of the hand, the orange flew up and he caught it as it fell. "They want a taste of how things used to be, they want to gather their food with their own two hands, they want service with a smile. And you can't get that with automated delivery." He gestured around him. "It may be less 'efficient', but shopping like this is a luxury few get to enjoy anymore and people will pay handsomely for the experience." Cathy didn't say anything, but looked to be considering his words.</p>`);
					r.push(`<p>Eventually, the party made their way to the star of Blue Barn, the dairy aisle. Display coolers lined the aisle, filled to the brim with milk bottles of various shapes and sizes. Each one bore a printed screen containing a recording of the sexual act that had produced the milk. Whoever was in charge of managing the aisle was kind enough to arrange the milk by kink and sexual act.</p>`);
					r.push(`<p>Cathy clutched her plushie and looked around the aisle uncertainty. Scott nudged her. "Go grab a bottle of From the Source, it should be in the titfucking section." She clutched the plushie a little harder then walked down the aisle.</p>`);
					r.push(`<p>While she was looking for her quarry, something caught her eye. She squinted at a particular bottle for a moment before reaching in to grab it. With a hesitant finger, she pressed the play button on the bottle. As the video played, a look of dawning horror spread across her face. She was so enthralled with the video, she didn't notice Scott walking up to her. "Oh, did you find something you wanted?" She started and spun to face him, brandishing the bottle at him. "YOU MARRIED YOUR SISTER!?"</p>`);

					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`<p>The offending bottle was of a higher quality than most of its neighbors, offering a gallery of artists' renditions of the cow in addition to the video. The video on the bottle showed Scott fucking Annie from behind, a slightly tinny slap followed by a squeal from the tiny speakers on the bottle. However, this was not the source of Cathy's distress, as surprising as that may be. Rather, it was the words, Top shelf: All in the Family, printed in red lettering across the bottle.</p>`);
					r.push(`<p>Scott cocked an eyebrow, utterly unperturbed. "Yes? And?" Cathy sputtered, but quickly regained her momentum. "You don't do that! Why would you do that!?" she all but shrieked, her face blotchy.</p>`);
					r.push(`<p>"For two reasons," he said, and held up a finger. "One, have you seen her?" A lewd grin spread across his face, "Rawr." Cathy's blush deepened as her outrage engine built up steam. The grin slid off of Scott's face and his voice grew solemn. "Second, parents can't sell their children if they're already married."</p>`);
					r.push(`<p>She froze, the blood draining from her face. "What... why?" Scott sighed and looked her in the eye. "I would think you of all people would understand why." Cathy flinched and looked down, clutching her plushie tighter. His stare never wavered. "Didn't you sign up with me to help your mother? Family is important after all." For a while she just stared down at her own cleavage, fiddling with her plushie. She nodded, "Yeah... but not just for her." She looked up, her eyes shining with unshed tears. "I did it for me too." A shudder ran through her and tears began to roll down her cheeks. "I didn't know what to do without her."</p>`);
					r.push(`<p>Scott patted her head and pulled her into a hug. "Honesty is to be rewarded." Her body shuddered with suppressed sobs. June caught his eye over Cathy's shoulder and gave him an uncertain look. He shook his head slightly and gave her a thumbs up. She nodded slightly and quietly left the aisle. Cathy sniffed and mumbled into his chest, "I miss my mom." He rubbed slow circles in back and said softly, "I know, I know."</p>`);
					r.push(`<p>After her sobs subsided, the pair continued hugging in silence for a moment before separating. Cathy rubbed her eyes and sniffed, attempting to regain her composure. "So what happens now?" Scott quirked an eyebrow, "For now, we finish shopping and head on home." He looked up and down the aisle. "Provided that we can find where June wandered off to." A soft sigh escaped her throat. "That's not what I meant." She gave him a steady look. "What's the next step to getting my mom back?"</p>`);
					r.push(`<p>Scott considered her for a moment before responding. "For now, you'll continue your drug regimen and etiquette lessons." He gave her breasts a poke. "Your milk hasn't come in so we can't start that training or begin selling your milk, but there are things you can do." He drummed out a little beat on her breasts. "Now that you're big enough to not get stopped when you walk down the street, you could start working here." An impish grin spread over his face. "I'm sure Martha would enjoy having you around." Cathy flushed and let out a small huff. His grin widened.</p>`);
					r.push(`<p>He groped her slowly as he thought. "As for getting your mom, considering who your mother was, her price is bound to be exorbitant. Even if I got a sweetheart rate." He brushed a lock of her hair behind her ear. "But we're in no rush. Her current owner is treating her rather well and seems fond of her, so he probably won't randomly sell her off." A mild frown spread across his face. "The downside of that is it will take even more money or favors to get him to part with her, but we'll cross that bridge when we get to it."</p>`);
					r.push(`<p>As he spoke, Cathy's expression became more and more disheartened. Scott smiled reassuringly, "Don't worry about it. I have a plan to make you so profitable you could buy your mom a dozen times over." She nodded, but didn't look entirely reassured. "You've already made a fair bit of progress today," he said, his smile bright. "What do you mean?" Her face had the expression of a wary kitten expecting the roar of vacuum cleaner. "You didn't freak out when I touched your breasts." He gave them a squeeze for emphasis. She looked conflicted and seemed on the verge of saying something, but decided against it. "Anyway, we should find June and head on out." He patted her butt, saying "Come along," and set out to find June with Cathy in tow.</p>`);
					r.push(`<p>It didn't take too long to find her. After passing a display of plushie cowslaves playing in a pool, they walked into an aisle devoted to greeting cards and other printed media. The various cards bore animated scenes catering to various situations. One card depicted a busty woman losing power to her exosuit, being pulled to the ground by her own breasts and a small group comes by to help her up. The words flowing across the card said 'We know you've fallen on hard times, but we'll always be there to support you' in a wavy font. The other side of the aisle bore a number of coloring books plastered with pictures of famous cows, magazines devoted to various tastes, and paperback erotica, some written by store employees. And hunched over by the magazines was June.</p>`);
					r.push(`<p>She was engrossed in reading an issue of Cow's Life. The cover had a looping video of a blonde cow spraying milk and making bedroom eyes at the viewer. The headline of the issue was an interview with Alexis Cream, the first cow in space. In smaller text were headlines like 'Five nipple stimulation methods guaranteed to increase lactation!', 'Finding the right cleavage vibrator for you', 'The new frontier of breast sex'. June seemed to have ignored the magazine's other offerings in favor of a review of a new model of mobile milker that promised to provide endless breastgasms.</p>`);
					r.push(`<p>Scott walked up behind her and slipped his arms around her to grab her breasts. "Doing some early Christmas shopping?" he asked looking over her shoulder. She leaned into him, "Just looking at the new milker you were going to buy for Sarah." He gave her breasts a squeeze as he read the article over her shoulder. "It's a high end model. I'm a very thoughtful father, aren't I?" he said in faux pompous tone, nodding to himself. A small smile spread across June's face. "Of course you are, master." They enjoyed each other's company for a moment before she spoke in a low tone, "Everything alright?" He teased her nipples and spoke in the same tone, "I think I've made some progress with her." He leaned closer to whisper in her ear, "I told you it was a good idea."</p>`);
					r.push(`<p>They separated and returned to the cart. While they were having their little chat, Cathy had decided to brave the contents of the erotica section. The look on her face was difficult to describe, but she was reading the book very intently. Scott caught her eye and said, "You can have it, if you want it..." She snapped the book shut, placed it on the shelf, and tried to look as small as possible. He just shrugged in response and looked through the cart before nodding to himself. "I think we're ready to go. Any objections?" June shook her head, but Cathy looked at the shelf for a long second before shaking her head.</p>`);
					r.push(`<p>The three gathered up their purchases and headed to the exit. As they were passing through the checkout, Scott noticed a certain book pass amongst their purchases. He turned to give Cathy a look. She was pointedly not looking in his direction when she snatched up the book and made a beeline for the door. When she stepped outside, she noticed something was off about the building, but she couldn't put her finger on it. Scott and June made their way outside to see her gaze flickering over the building. Scott simply smiled at Cathy. Finally, the penny dropped, Cathy glared at him like she was trying to set him on fire with her mind. The upper level of Blue Barn didn't have cows mounted on the wall. Cackling laughter echoed in the street.</p>`);

					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`<p>Cathy's ire had faded somewhat by the time they made it home. A soft chime rang out as they walked in the door, followed shortly by a faint voice calling out, "Welcome home," from further in the house. The trio put the groceries on the kitchen island and began to put them away. The background murmur of a TV and the faint roar of a hair dryer were coming from the next room. Scott was about to walk into the room, but he paused and looked at the plushie in his hand. He turned and pressed it into June's hands, giving her a meaningful look. She looked at the doll for a moment before returning his look with a smile. Message received. He gave her a quick nod before walking through the door.</p>`);
					r.push(`<p>At first glance, the living room didn't look too dissimilar from something out of an old-world home decorating magazine. The furniture was well made and comfortable, but was noticeably designed with more robust figures in mind. Books and magazines laid scattered across a number of coffee and end tables. An old copy of <i>Milkers Monthly</i> was opened to a video of a cowslave demonstrating the use of a cleavage vibrator. The shelves on the far wall held a number of statues, their brass figures bearing immobilizing breasts. And on the end was a 1st place ribbon from a school milking competition.</p>`);
					r.push(`<p>Annie sat on the couch with a towel around her shoulders, only wearing her exosuit. She relaxed as Sadie went over her vast cleavage with a hair dryer and a towel, letting out noises of contentment as she luxuriated in Sadie's ministrations. Sarah was cuddled up to her mother, her hair still damp from the shower. Scott sat down on the couch and pulled Sarah onto his lap before moving closer to his wife. Sarah just made herself comfortable while Annie leaned over to give him a kiss. "Everything go alright?" He patted his wife's breast reassuringly. "There was a little bump or two, but it went alright. I'll tell you about it later."</p>`);
					r.push(`<p>Sarah turned around to face her father. "Did you get it?" she asked expectantly. He tilted his head in faux confusion, "Get what?" She frowned at him and said in an annoyed tone, "Daddy." A plushie peeked over from behind the couch for a moment before dipping back down. Sarah focused on the spot the plushie had just inhabited with laser intensity before turning to give him an accusing look. Scott did his best to look confused. "What is it sweetheart?"</p>`);
					r.push(`<p>The plushie popped back up and began to move along the back of the couch in a parody of walking. The doll stopped at Scott's shoulder and prodded it with a tiny hand. "Oh, hi Tabby. What brings you here?" The plushie moved closer to his ear. "You're here to keep Sarah company? That's very sweet of you." Sarah let out a piteous whine, "Daddy." Scott appeared to be too enthralled with his diminutive conversation partner to hear her. "What's that? You're also here to make sure she eats her greens, cleans her toys, and does her homework?" He gave Sarah a dubious glance and turned to whisper to the plushie, sotto voce, "I think that's bit of a tall order." Sarah pouted at her father, but grudgingly said, "Okay."</p>`);
					r.push(`<p>June stood up from behind the couch and handed the plushie to Sarah. Sarah grumbled, but tightly hugged the plushie to her chest. She cuddled up further to her father and mumbled softly, "Thank you." He kissed her forehead, his hand stroking her hair softly. "You're very welcome."</p>`);
					r.push(`<p>A moment passed in companionable silence until a shrill sound emanated from June's pocket. She looked a bit sheepish and said, "Sorry", before pulling out a slim device to prod at it. "The brisket should be finished soon, maybe another hour or so." Scott nodded, gently rubbing Sarah's back. "Alright. Hey sweetheart, could you and Cathy go set the table?" She let out a sound of acknowledgment and when over to grab the other girl's hand. Cathy reluctantly set down her paperback and allowed Sarah to pull her into the kitchen.</p>`);
					r.push(`<p>Dinner was a rather pleasant affair, all things considered. The brisket was tender and paired well with a spinach salad. Cathy managed a conversation with June about greenhouses with the others interjecting every so often. Sarah cleaned her plate without complaint, although she did clamber into her mother's cleavage the moment she finished.</p>`);
					r.push(`<p>After dinner, the family reconvened in the living room. Cathy had returned to reading her paperback in an armchair. June and Sadie were sitting together in a love seat, both fiddling with their devices. Sarah had appropriated the TV remote and was flipping through channels from her commanding perch in Annie's cleavage.</p>`);
					r.push(`<p>Eventually, Sarah settled on an animated show in the middle of its opening. The show appeared to be similar to the magical girl shows of the old world, but with enough sexual content to be mistaken for pornography. The premise appeared to be that spirits were possessing women and the only way to drive the evil specters out of the girls' hearts was by massively expanding their breasts. Apparently, the current episode was the second part of an arc involving a breast shrinking witch.</p>`);
					r.push(`<p>The heroine danced and wobbled around crowds of possessed women, leaving piles of jiggly breast flesh and clouds of sparkles in her wake. Eventually, she reached the witch and began to shoot at her with blasts of colored light. But the witch's power was too much for her and was sent fleeing, her skimpy dress now tattered. While on the run from the possessed, she encounters her mysterious love interest. A quick titfuck power-up and inspirational speech later, the heroine returned to challenge the witch. After rambling about love, justice, and the beauty of huge boobs, she blasted away the witch with a 'Magical Milky Mammary Beam'.</p>`);
					r.push(`<p>All throughout the show, Cathy was mesmerized by the show in the same way one might be by a train wreck. When the credits rolled, she broke out of the spell and noticed that another episode was about to play. "Uh, could we watch something else?" Cathy asked tentatively. Sarah looked like she going to object, but Scott gave her a quick look. She pouted at her father, but began to flip through the channels. As the channels went by, Cathy's eyes grew wider. "Why don't we go back to the cartoon channel? "</p>`);
					r.push(`<p>After a few more episodes, Scott noticed the time. "I think it's bedtime for cuddly cows." Sarah grumbled, but didn't resist when he lifted her out of Annie's cleavage. She received a hug and a kiss from both her parents before June took her off to prepare for bed. Scott turned to Cathy and said, "Why don't you head off too? You'll be coming into work with me in the morning so you should get some rest." Cathy nodded and headed off to her room, but returned a moment later to grab her plushie. Annie caught sight of the doll and gave Cathy a lascivious grin. Cathy did her best to avoid eye contact and all but ran out of the room.</p>`);
					r.push(`<p>The moment Cathy was out the door, Annie began giggling which shortly transformed into breast quaking laughter. She wiped at her eyes, her smile bright as she looked at her husband. "Have I told you lately that I love you?" He wrapped an arm around her waist, his eyes bright with amusement, "I don't know, but it couldn't hurt to say it again." She pulled him closer, kissed him on the cheek and whispered, "I love you." He returned her kiss, rubbed her back gently, and whispered back, "I know."</p>`);
					r.push(`<p>For a while, the couple just relaxed and enjoyed each other's company. Annie let out a sigh of pleasure and asked, "You said there were a few bumps?" Scott let out a sound of acknowledgment. "Gabe has been riding the girls rather hard." Almost immediately, she said, "You should try getting her knocked up." Laughter burst from his chest; at her questioning look he said, "Beth said much the same thing." She nodded approvingly. "Beth is a smart girl. There can always be more babies." She pressed herself into her husband and said, "Gabe isn't the only one who needs knocking up." She nibbled on his earlobe and whispered, "Babies, babies, babies, babies, babies." He turned to look at her and she caught his lips in a searing kiss. When they parted she seemed short of breath, her eyes filled with need. "Babies."</p>`);
					r.push(`<p>Scott took a moment to steady his breath. "You know we have to wait for the treatment to take." Annie let out a sound of displeasure, but Scott didn't waver. "Do you want to go through all the trouble we had with Sarah again?" She deflated a bit. He leaned over and whispered in her ear, "That doesn't mean we can't get some practice in." Immediately, Annie captured his mouth again and began tearing at his clothes. It took them a few hours to make it back to the bedroom.</p>`);

					return r.join(" ");
				}
			},
		]
	}],
	[13, {// Slaver/raider documentary
		tags: {},
		loop: true,
		episode: [
			{
				get text() {
					const r = [];
					r.push(`which is currently in the middle of a "real life" documentary.`);
					r.push(`<p>A narrator speaks over an establishing shot showing a mountain range blanketed by fog and a ruined road winding its way through the peaks.</p>`);
					r.push(`<p>"The mountain roads started getting dangerous when the rains started getting bad. All that water washed away the earth and loosened up rocks that had stood there for ages. Rockslides began occurring more and more frequently, so the roads started seeing less and less traffic. People with enough money took flights to get across the mountains, and those without money simply stayed put. That is until things started becoming worse on that side of the peaks. There was an exodus of desperate people leaving some time ago after their government withdrew from the area, and that many vehicles were enough to bring down the rocks and kill hundreds."</p>`);
					r.push(`<p>The camera zooms down onto a group of people, all suited for combat and dressed in the grey camouflage of the mountains. They are situated on a small outcropping of rock that overlooks the road, barely visible through the fog. The group is setting up a variety of pieces of technology. A camera and monitor, a pair of radios, one of which seems to be scanning frequencies, and a tall, spindly mass off metal which you assume is a portable transceiver of some form.</p>`);
					r.push(`<p>The narrator continues, "All that was left back home were those stupid enough to think things would get better and those intelligent enough to realize that crossing was death. Now the roads are in pretty bad shape, but occasionally some groups come through. Either stupid or desperate, and either case works for us."</p>`);
					r.push(`<p>Two vans trundle down the road in the early morning fog, seen only by a pair of vague red shapes on the monitor. Likely a family trying their escape and hoping that what exists on the other side is better than what they are abandoning. The vehicles slow to a halt, and a couple of human forms step out. A good portion of the road in front of them is gone. Perhaps if they were on motorbikes, they would be able to use what remains, but, as it stands, they will likely need to walk for the rest of the journey.</p>`);
					r.push(`<p>The click of static from a radio breaks the silence. "Recon, report?"</p>`);
					r.push(`<p>A hand reaches in from offscreen, grabs the radio, and responds, "Two vans, both have stopped at the cliff. Unknown numbers. One occupant from each vehicle has exited. Not sure if they are the drivers. Hold until numbers are confirmed. We'll give the signal. Over."</p>`);
					r.push(`<p>"Copy, Recon. Waiting for your mark."</p>`);
					r.push(`<p>Both figures move back towards the vans. One begins digging around under the hood of the first van. Possibly sabotaging it so it won't be stolen. The other goes to the back and, after a moment, five more red figures step out into the open. Two look to be about as tall as the first pair, but the rest are much shorter.</p>`);
					r.push(`<p>"Look, Mikey, kids," a voice whispers from out of frame, "they'll turn a good profit."</p>`);
					r.push(`<p>Another voice whispers back, "Jesus, Hamill, only you get excited about kidnapping children."</p>`);
					r.push(`<p>"They make good money. This is our job. It's what we do."</p>`);
					r.push(`<p>"Yeah, but maybe sound a bit less enthusiastic about it, huh?"</p>`);
					r.push(`<p>The collection of figures make their way to the second vehicle, one stopping to dig under the hood again and the rest moving to the vehicle's rear. Shortly it becomes clear that nobody is getting out, and the radio clicks on.</p>`);
					r.push(`<p>"This is Recon. Looks like everyone is out of the vehicles. Rear vehicle looks to be supplies or invalids. All teams move in. Over."</p>`);
					r.push(`<p>"Copy, Recon. Alpha team, moving in."</p>`);
					r.push(`<p>"Bravo, moving in."</p>`);
					r.push(`<p>After a long moment, a group of four figures appears at the top of the screen, slowly making their way down the slope. Shortly after, another set of four enters from the left, the shapes low to the ground in a crouch. Suddenly both groups dash towards the vehicles, causing what seems to be panic in the family. The children run to one of the figures, while the rest immediately spread out between the teams and the children.</p>`);
					r.push(`<p>The two teams slowly spread out, surrounding the family as one of them seems to be madly gesticulating. After some movements by one of their assailants, the gesturing one makes a quick grab for his waist, which is immediately answered by a bright flash from one team member and a splattering of quickly fading red on the ground. After a moment, the sound of the gunshot finally reaches the outcropping. The figure guarding the children dives toward the growing circle of red, the other two immediately put their hands up, and the children drop to the ground.</p>`);
					r.push(`<p>"Nine hundred ¤ bullet."</p>`);
					r.push(`<p>"Shut up, Hamill. You saw him going for a gun as well as I did."</p>`);
					r.push(`<p>"Yeah, whatever. At least it'll make the kids easier to deal with. Kill a parent, and it takes the fight right out of them."</p>`);
					r.push(`<p>"You and the damn kids, man.”</p>`);
					r.push(`<p>The figure atop the body is dragged off the fading corpse, leaving an imprint of their heat on it. Meanwhile, the children are being herded together while the other two are led back down the road.</p>`);
					r.push(`<p>The radio crackles to life again. "Everything locked down here. Charlie, get down here and get these supplies. Recon, meet us at the LZ. Over."</p>`);
					r.push(`<p>"This is Charlie, moving to secure."</p>`);
					r.push(`<p>"Recon, moving out."</p>`);
					r.push(`<p>The screen is closed as the pool of heat in the middle slowly cools. The tech is quickly packed away, and the recon team leaves the vantage point. The view pans up and out as the group moves off the outcropping. Before long, the individuals are obscured by the mist, and all that can be seen are a few mountain peaks. The shot lingers for a time before fading to black and cutting to commercial.</p>`);

					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`skipping straight to the middle of yet another "real life" documentary.`);
					r.push(`<p>The dull blueish glow of a simple terminal illuminates a haggard, pock-marked face as it gazes at account data just barely in the black. A simple reminder breaks the tense silence between the figure and the machine. "Deployment at 1800. Two hour reminder."</p>`);
					r.push(`<p>With a heavy sigh the figure shuts the terminal and heads out into the sun-lit concourse, grabbing a simple handbag as they go. They join the flowing chaos of people heading in the direction of the market sectors. After a time they break from the river of bodies toward a multi-level piece of solid, pristine white built into the massive, slowly curving wall of businesses that makes up the center of the arcology's markets. The simple black text marks the building as "Vinewood Hospital." A crystal clear door slides open silently at the figure's approach, the thin, metal frame moving being the only indication that anything had changed. The interior of the structure is, like the exterior, a chilly, sterile white. A few staff in simple, pastel scrubs move around the open reception area, all making efforts to stay clear of the figure's path toward the reception counter.</p>`);
					r.push(`<p>At their approach, the reception slave gives a smile that only looks slightly forced, "How can I help you today?"</p>`);
					r.push(`<p>"Alex Hamilton to see Stephen Hamilton."</p>`);
					r.push(`<p>"Stephen Hamilton... account number oh, oh, six, two, three, one, correct?"</p>`);
					r.push(`<p>Alex simply nods in response.</p>`);
					r.push(`<p>"Then if you would wait a moment, a nurse will be here shortly."</p>`);
					r.push(`<p>Not a minute later and a particularly short woman jogs up to the counter. "Alex, dear," she says with a grin, "lovely to see you again. This way, this way," and she turns back to head the way she came, Alex in tow.</p>`);
					r.push(`<p>"I know it's only been few days, but how have you been?"</p>`);
					r.push(`<p>"Well enough, work has been, well, work. How's Stephen doing?"</p>`);
					r.push(`<p>"Oh, I'm sure, especially with what you do. He's the same as last time. Still responding well to the treatment. No significant side effects. Doc Percy says he's probably going to be on a limited curative dose for at least another month to avoid exasperating the condition. Here, just a moment."</p>`);
					r.push(`<p>The nurse opens one of the many doors in the pristine, white hall and leans in. "Stevie, dear, you've got someone here to see you," she says before leaning back out and giving a nod to Alex who walks into the room.</p>`);
					r.push(`<p>The room is a sharp contrast to the sterile hospital feeling of the rest of the building, looking like a child's room you might have seen in a suburban home before things started falling apart. The clean, warm, homey feeling of safety is accentuated by sunlight pouring in from an artificial window that looks out to a lightly forested field. A small collection of toys is scattered about the soft carpet and a small breeze blows through the room from a small ceiling fan. On the bed is a young boy sitting up and rubbing sleep from his eyes. "Hey, kiddo," Alex says, stepping further into the room and shutting the door, "How are you feeling?"</p>`);
					r.push(`<p>The boy immediately perks up at the voice and, leaping out of bed, performs what very well could have been a tackle if he were larger. "Dad!" he shouts, trying his best to avoid sliding down from where he latched onto his father. Laughing gently, Alex picks up his son and wraps him in a hug of his own.</p>`);
					r.push(`<p>"So I guess you're feeling well then?"</p>`);
					r.push(`<p>"Mmhm, Mister Newport said I was doing good and when I puke there's hardly any blood anymore."</p>`);
					r.push(`<p>"Good, I'm glad to hear it, but you probably shouldn't jump out of bed like that," he says, setting Stephen down, "you don't want to accidentally hurt yourself by playing too hard, right?"</p>`);
					r.push(`<p>"Yes, dad," he replies, a bit dejectedly, "but I was excited to see you."</p>`);
					r.push(`<p>Alex drops to one knee and gently tussles the boy's hair. "I know, just be careful okay? Now how about we play some games, huh?"</p>`);
					r.push(`<p>Stephen's eyes light up and he begins running toward a shelf of boxes before catching himself and slowing down.</p>`);
					r.push(`<p>For the next hour the two play a variety of games while the nurse occasionally checks in. Eventually Stephen actually falls asleep in the middle of quite a rousing bout of Connect Four. Alex carries the boy to bed where he watches him sleep until a call drags his attention away.</p>`);
					r.push(`<p>Walking to the corner of the room he answers.</p>`);
					r.push(`<p>"Hey, Hamill, we're shoving off in twenty. Where the hell are you?"</p>`);
					r.push(`<p>"Calm down. I'm on my way," he says, glancing back at his son, "I had something important to take care of first."</p>`);
					r.push(`<p>"Alright, just get over here, pronto. You know Captain Pantyknot won't wait for you."</p>`);
					r.push(`<p>"Yeah, I'll see you there."</p>`);
					r.push(`<p>The call over, Alex stands next to his son's bed for a moment before reaching into his handbag, pulling out a small stuffed dog, and placing it gently on the nightstand. After planting a gentle kiss on the sleeping child's cheek he moves to leave but is stopped in his tracks by a voice.</p>`);
					r.push(`<p>"Are you going to go and protect people, Dad?"</p>`);
					r.push(`<p>A pained grimace crosses over his face as he locks eyes with the nurse who has a very similar expression. After a long moment he turns back with the most genuine smile a father can muster and says, "I sure am, kiddo. I sure am," before turning again to leave.</p>`);
					r.push(`<p>"Good luck."</p>`);
					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`currently airing a program about the nuances of slave life.`);
					r.push(`<p>The screen fades in with a fly-through shot of what is undoubtedly an arcology penthouse littered with slaves accompanied by a somewhat upbeat piano melody. You recognize many of the traditional additions to a penthouse, though there are some stylistic differences. After a short time the show identifies itself as "The Other Hand" before fading out.</p>`);
					r.push(`<p>The show returns after a brief moment to a shot of a penthouse slave cafeteria that is absolutely filled with slaves. Most are nude but there are a few in maids' uniforms that look to be the current shift of house servants. The low murmur of slaves talking can be heard as a man's voice starts narrating over it.</p>`);
					r.push(`<p>"Like any human, slaves require interaction to maintain a healthy mental state. It is well known that this need can be manipulated to drive even the most rebellious slaves into subservience. It is also known that, like in any environment where the same humans interact with each other over extended periods, slaves will form relationships with other slaves, from the most intense of hatred to the most romantic of relationships."</p>`);
					r.push(`<p>The scene shifts to the entrance of a very well decorated brothel lower in the arcology where clearly well cared for slaves are attracting the attention of passersby by showing off their skills in various intimate ways.</p>`);
					r.push(`<p>"While it may be difficult to effectively prevent rivalries from forming, some slaveowners do mandate against certain positive relationships for any number of reasons. From a desire to seed fear among slaves and prevent them from having a source of solace to a belief that their slaves should be devoted only to their owner."</p>`);
					r.push(`<p>Again, the scene changes to a view just inside the entrance of what looks to be the servants' quarters. Slaves in conservative maid's uniforms bustle about, but there are a few knots of slaves talking amongst themselves dotted around.</p>`);
					r.push(`<p>"However, here in the arcology Open Skies, the owner, Charles Greenwich, has no such desires and has stated that he greatly enjoys watching the various relationships between slaves rise and fall and encourages such things within his chattel."</p>`);
					r.push(`<p>The scene switches to a surprisingly short, middle-aged man in an outfit reminiscent of the old American West. He's seated in front of the camera with a particular energy and warmth sparkling in his eyes. He speaks, answering a question you didn't hear, "Why, I didn't get where I am now by mistreating my property. Even cows develop friendships, even having best friends. I've seen a cow turn into an inconsolable wreck just because his friend caught ill and had to be put down."</p>`);
					r.push(`<p>"Now, that seems like a flaw, don't it? Why let your slaves have the chance of basically losing two when one goes? But believe me when I say you don't want over a hundred and fifty slaves resenting you for not letting them make friendly-like. Not that I'd want to or nothing. They're all dear to me and I want them happy. That's when the best work gets done."</p>`);
					r.push(`<p>"Now, I'm sure you're vying to ask why I don't do nothin' about the rivalries that crop up. That's 'cuz it's a right pain in the ass to fix. You have to sit both parties down and make them talk their problems out. I will admit that I do like seeing it happen some too. It's like high school drama but I get to see it all unfold."</p>`);
					r.push(`<p>The shot switches to the inside of a comparatively sparsely populated spa. The gentle splash of water is interspersed with some shots of laughter and bits of louder conversion from the lounging slaves.</p>`);
					r.push(`<p>The narrator begins speaking again, "the fact of the matter is that a happy slave is a healthy slave, and allowing a slave to have friends is one of the more simple ways to achieve that."</p>`);
					r.push(`<p>With that, the credits roll, listing a string of names and titles that completely fail to keep your attention further.</p>`);
					return r.join(" ");
				}
			},
		]
	}],
	[14, {// Channel
		tags: {loli: true},
		loop: true,
		intro: ``,
		episode: [
			{
				get text() {
					const r = [];
					r.push(`which is currently showing the newest episode of a family-oriented soap opera. The intro shows a beautiful family of three, featuring a husband, wife, and young daughter. When they show the events of the previous episode, it quickly becomes clear that this episode is the finale of the current season of the show.`);
					r.push(`<p>The episode opens with the husband waking up alone in bed and finding a note on his nightstand that his wife had left for him at the end of the previous episode. Through narration in his head, the note is read aloud to the audience.</p>`);
					r.push(`<p>"Jason, I'm sorry you had to find out like this, but I had no other choice. I didn't want to fight about this, and I didn't want you to think you could change my mind. I'm leaving, and this time I'm not coming back. I tried for so many years to make this work, but I never really wanted a family to begin with. I'm no mother, and I never could be. By the time you read this I'll already be in another arcology, much too far away for you to find me. Please take care of Jessica in all the ways I couldn't."</p>`);
					r.push(`<p>After finishing the note, Jason weeps into his hands before the camera transitions to a shot showing him in a rather nice kitchen explaining to his daughter where her mother went. His deep sadness is all displayed right there on his face, much to the actor's credit. His daughter leaves for school, but not before looking back through the doorway at her depressed father with pity. The camera pans to one of the large windows illuminating the kitchen, and zooms in on some street whores before dissolving into a shot of Jason walking that same street.</p>`);
					r.push(`<p>He stops just short of a few prostitutes, seeing one that remarkably resembles his now ex-wife. He seems torn, but quickly replaces the hesitant look on his face with one of determination. He approaches the whore with a few ¤ in hand, and in less than a minute she's dragging him by the hand down a nearby alley. She stops right in the middle of it, hikes up her short skirt, and bends over with her hands against the steel wall in front of her before turning her head to Jason and speaking.</p>`);
					r.push(`<p>"I don't care if anyone sees, but most customers prefer this way." she giggles, as Jason undoes his pants. Despite the fact that he has a rear-view of a perfect, smooth pussy and a taut, pink asshole, Jason can't achieve an erection. "What's the matter?" the hooker asks him. "Need me to take care of you?" A short flashback sequence plays, centered on the note from earlier. "Take care of Jessica." his wife's disembodied voice implores him, the audio mixed to reverberate hauntingly.</p>`);
					r.push(`<p>"Keep the money." Jason says before he immediately runs off, leaving the hooker looking perplexed and then bored in the dingy alley. With a quick cut he's back in his apartment, watching an in-universe parody of a popular real-world FCTV show. His daughter conveniently gets home at that exact time, throwing open the door and kicking off the shoes to her school uniform. "Hi Daddy!" she says, far too jubilant considering the events of that morning. "Hi Jessica." he replies sullenly.</p>`);
					r.push(`<p>You start wondering if you should even be playing this, as the sadness has utterly killed the mood in the room.`);
					if (haremLength() > 0) {
						r.push(`Some of your girls' eyes are already welling with tears.`);
					}
					r.push(`</p><p>"You're still sad." Jessica says to him, pouting a bit. "I noticed this morning, too. How sad you were that Mommy left. I'm sorry."</p>`);
					r.push(`<p>"It's not your fault sweetie. Aren't you sad too?"</p>`);

					r.push(`<p>"Yes... I don't understand why Mommy would leave us."</p>`);
					r.push(`<p>Jason pauses for a moment, as if to consider whether he should be honest with his daughter. A quick image of the note before is shown, just to hammer the point in for the dumber audience members.</p>`);
					r.push(`<p>"I don't get it either. I thought she wanted to be a family. Like I did."</p>`);
					r.push(`<p>Jessica walks across the connected kitchen and living room to her father's spot on the couch, and sits next to him. "I don't want you to be sad anymore, Daddy."</p>`);

					r.push(`<p>"Aw." Jason says, appearing truly touched (you begin to consider investing in this actor). "I know. I love you, Jessica." He pats her head.</p>`);
					r.push(`<p>"I love you too, Daddy. And I want to be a family with you. I want to be like Mommy! We can make a new family, and we can be happy forever!" At this, Jason stands up abruptly. His daughter's earlier jubilance is finally making sense.</p>`);
					r.push(`<p>"Being a mother is hard work, sweetie. It's something you need to be sure about before you just jump into it."</p>`);
					r.push(`<p>"I know!" Jason's face flashes with disbelief. "No, really! I do! I've been learning about it at school. Today they brought in a boy and a girl from the slave school across the plaza and had them show us how to make a baby, and I kept thinking about you, Daddy. I want to do that with you." A quick shot of Jason's stiffening penis immediately redeems the somber mood of the entire episode, as you realize what's coming.</p>`);
					r.push(`<p>Jessica notices her father's silent enthusiasm growing in his pants, and steps towards him. "I guess you want that too." That's the last sentence she utters before undoing her father's pants and filling her mouth with his hard cock. She moans into him as she starts sucking, causing his eyes to roll back and for him to grab the top of her head. When she finally manages to swallow him whole, he can't help but audibly moan.</p>`);
					r.push(`<p>"I love you, sweetie." He says, each word carrying more eroticism than the last.</p>`);
					r.push(`<p>"Iluvutu." She tries to reply through his member. The vibrating sensation it causes is too much, and soon cum is leaking from the corners of Jessica's mouth and one of her nostrils. Jason pops free of her, walking away into the kitchen. Jessica swallows her mouthful and asks where he's going.</p>`);
					r.push(`<p>"Just getting something, so we don't have to wait to make our new family." Filled with joy, Jessica screams loud enough to put most untrained slaves to shame, and reaches up her school skirt to pull off her panties as quickly as possible. As she does, Jason digs through a cabinet until he finds a packet of stamina pills (the brand of which is conveniently facing the camera) and pops one. He picks up his daughter in a bridal carry and takes her towards the master bedroom. "If you're going to be the Mommy from now on", he coos, "then that's where you'll be sleeping." The camera follows their walk at a low angle, revealing that his daughter is so thoroughly aroused her pussy is dripping on the carpet and leaving a trail of wet dots.</p>`);
					r.push(`<p>He puts her down on the bed, and she moves to her hands and knees, explaining that this is how the slaves did it for the class presentation. Her father cups her thighs, slowly tracing up. He stops at her ass for a quick squeeze, producing a squeak from his daughter, and continues drifting across her body until his hands are around her waist. Hands free, he rubs his cock between her asscheeks. "Are you ready?" he asks her.</p>`);
					r.push(`<p>"Yes Daddy." even though she's almost whispering, her voice is filled with confidence.</p>`);
					r.push(`<p>Jason takes one hand off her hips and positions himself at the entrance to her pussy, sliding in the head with ease before immediately hitting a block. He leans forward until he can whisper in her ear "Deep breath, sweetie." then pushes a little harder against the resistance. "Ah..." Jessica moans, a mixture of pain and unprecedented pleasure. Finally breaking her hymen, his penis suddenly slides more than halfway into her. "AH!" He pushes the rest in before slowly sliding out, savoring every`);
					if (V.showInches === 2) {
						r.push(`fraction of an inch`);
					} else {
						r.push(`millimeter`);
					}
					r.push(`of her insides. The slow pace continues for some time, with Jessica's body slowly lowering more and more until only her father's hands are keeping her ass in the air. By that point Jason is hammering away, every thrust producing a slap loud enough to carry a slight echo in the apartment's master bedroom. The sheets beneath Jessica's pussy are soaked through, with a strand of femcum hanging between them and her clit. Her father grabs her tightly and rotates her body to missionary without removing his cock from her, then rips open her shirt, throwing buttons all around the room and exposing her tiny tits. He starts to play with them, resuming the tempo of his thrusts.</p>`);
					r.push(`<p>Jessica's hands grab at the sheets blindly, balling them up in her fists and causing one of the corners to become detached from the mattress. At this point she's no longer capable of dialog, moaning at a volume that would be audible at a club and begging for more in an almost unintelligible way. Her legs wrap around her father's hips, pulling her in closer, and making the seal between them tighter. Feeling this drives Jason over the edge and he slams into her crotch recklessly, knocking the bed frame against the window with every thrust. He mauls her tits, squeezing them and pinching the nipples, sometimes dipping his head down to suck and lick them. With one final hard thrust, he stops while completely inside her and blows an impressive load, especially for TV. His daughter's pussy is filled so quickly that cum is squeezed out of the limited space between his cock and her inner walls, squirting out onto the bed and pooling against her ass and on the inside of the back of her skirt. Jessica moans and convulses, her pussy contractions squeezing a second orgasm out of Jason. Panting, he says "You make the same face your mother used to."</p>`);
					r.push(`<p>"Am I as pretty as Mommy?" she asks him earnestly.</p>`);
					r.push(`<p>"No." he states like a fact. "You're even prettier."</p>`);
					r.push(`<p>The camera moves to the side of them, showing their faces`);
					if (V.showInches === 2) {
						r.push(`inches`);
					} else {
						r.push(`centimeters`);
					}
					r.push(`apart.</p>`);
					r.push(`<p>"I'm glad my first time was with you, Daddy."</p>`);
					r.push(`<p>"Me too, sweetie."</p>`);
					r.push(`<p>"And I can't wait to have your baby."</p>`);
					r.push(`<p>"Our baby."</p>`);
					r.push(`<p>The two of them share a deep kiss, with his daughter's hands grasping his face. The camera pans away and over to the window, focused on the skyline of the arcology. Hopeful orchestral music plays as the image fades to black and the credits roll.</p>`);
					if (V.PC.belly >= 100) {
						r.push(`<p>Stunned, you`);
						if (V.PC.belly >= 100000) {
							r.push(`run your hands across your massive, gravid dome,`);
						} else if (V.PC.belly >= 60000) {
							r.push(`run your hands across your giant, life-filled belly,`);
						} else if (V.PC.belly >= 15000) {
							r.push(`stroke your advanced pregnancy,`);
						} else if (V.PC.belly >= 10000) {
							r.push(`stroke your big, pregnant belly,`);
						} else if (V.PC.belly >= 5000) {
							r.push(`stroke your pregnancy,`);
						} else if (V.PC.belly >= 1500) {
							r.push(`stroke your growing pregnancy,`);
						} else {
							r.push(`rest your hand on the small bump in your lower belly,`);
						}
						r.push(`appreciating the life growing within you and what future prospects may await it.</p>`);
					} else if (V.PC.dick >= 1) {
						r.push(`<p>Stunned and fully erect, you inexplicably feel the urge to creampie a pussy, so you`);
						if (S.Concubine && S.Concubine.vagina > 0 && canDoVaginal(S.Concubine)) {
							const {him} = getPronouns(S.Concubine);
							r.push(`grab ${S.Concubine.slaveName} and recreate the entire ending with ${him}.`);

							seX(S.Concubine, "vaginal", V.PC);

							if (canImpreg(S.Concubine, V.PC)) {
								knockMeUp(S.Concubine, 10, 0, -1);
							}
						} else if (fuckSlavesLength() > 0) {
							r.push(`grab the nearest slave watching with you, who is overjoyed to recreate the entire ending with you.`);
						} else {
							r.push(`make your way to the slave dormitory and pick out the perfect slave.`);
						}
						r.push(`You've never had a more hope-filled orgasm.</p>`);
					} else if (V.PC.vagina >= 1) {
						r.push(`<p>Stunned and soaking wet, you hurry to`);
						if (S.Concubine && canPenetrate(S.Concubine) && canImpreg(V.PC, S.Concubine) && (V.policies.sexualOpenness === 1 || S.Concubine.toyHole === "dick")) {
							const {him} = getPronouns(S.Concubine);
							r.push(`get ${S.Concubine.slaveName} nice and hard before recreating the entire ending with ${him}. You've never had a more hope-filled orgasm.`);

							seX(V.PC, "vaginal", S.Concubine);

							knockMeUp(V.PC, 10, 0, S.Concubine.ID);
						} else if (V.policies.sexualOpenness === 1) {
							r.push(`find your favorite cock to get a creampie from. You've never had a more lust-filled orgasm.`);
						} else {
							r.push(`find your favorite squirt dildo to creampie yourself with. You've never had a more lust-filled orgasm.`);
						}
						r.push(`</p>`);
					}

					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`currently displaying a Free Cities documentary on the benefits of aphrodisiacs, which is almost halfway over. A montage of out-of-context shots of injectors, suppositories, and bottles of liquid interspersed with very horny, sweaty slaves needily grinding on each other plays before cutting back to the presenter, a gorgeous young woman with long, brown hair in a tight one-piece red dress and matching heels. Her dress, practically a second skin, proudly reveals that she definitely isn't wearing a bra or panties of any kind but still leaves plenty up to the imagination increasing her enticing presence. She's with a handsome man in a lab coat, and they're sitting on a couch in an office with a microphone on a coffee table between them.`);
					r.push(`<p>"I met with one of the leading scientists working on cleaner, higher-purity aphrodisiacs." the woman presenting narrates.</p>`);
					r.push(`<p>The scientist's volume fades in, and you can finally hear what he has to say. "The problem with most of the cheap stuff is it can make you sick and it can be really hard to kick an addiction to it. With products similar to what we aim to create those risks are severely mitigated, showing that the potential for healthy, prolonged use of aphrodisiacs exists, and that cessation of use can be significantly easier."</p>`);
					r.push(`<p>The woman cuts in with a question. "But won't an easier time quitting mean a weaker product?"`);
					r.push(`<p>"Not at all." he says confidently. "But I'd rather show you than tell you." he says, motioning to the camera. He signals to someone off-camera and an unresisting woman in a nun's outfit is dragged out and placed on her knees in the middle of the room by two men in street clothes.</p>`);
					r.push(`<p>"This was a nun from the old world, recently made a slave." he explains. "We do all of our testing on legally purchased slaves who are slated to work in brothels that use aphrodisiacs anyway, so there's no harm done."</p>`);
					r.push(`<p>One of the men from earlier walks back into frame and hands the scientist an injector. "This is one of our latest prototypes, the purest we've produced yet. I'm proud to be able to show it off today." he says as he prepares an injection site on the right side of the nun's neck. He moves the injector close to her neck, just barely grazing her skin. "Before I do this, for the cameras, how do you feel about taking it up the ass in front of this nice girl, Sister?"</p>`);
					r.push(`<p>The nun looks up with anger and defiance before speaking in a low tone "Do you not know that the unrighteous will not inherit the kingdom of God? Do not be deceived. Neither the sexually immoral, nor idolaters, nor adulterers, nor m-" the scientist injects her, and her eyes immediately widen. Her cheeks quickly flush and her breathing becomes labored as she clenches her teeth. "What's the matter?" the scientist teases. "No more verses?"</p>`);
					r.push(`<p>The nun unconsciously moves closer to him, and finds herself hugging his thigh and rubbing her crotch against his leg like a dog. Her robes are soaked right at the spot where her pussy ought to be, and she's drooling as she undoes the scientist's pants. When his big, soft cock flops out and slaps her face, she desperately licks and sucks on it to get it hard before hungrily deepthroating it at a maddening pace. The scientist eventually grabs her hair and rips his cock out of her mouth before blowing his load all over her face, all on camera. "One more time for the cameras." he says. "How do you feel about taking it up the ass in front of this nice girl, Sister?"</p>`);
					r.push(`<p>"Please fuck me." the nun whimpers. "Please. I need it. My... it burns."</p>`);
					r.push(`<p>"Fuck you in your ass?" he clarifies.</p>`);
					r.push(`<p>"Anywhere. Please, now. Please."</p>`);
					r.push(`<p>He bends her over the couch, right next to the presenter, who's been watching the entire time. She's transfixed with genuine interest in the aphrodisiacs and genuine cocklust for the scientist. The scientist slides his spit-covered cock into the nun's ass, and she thanks him through tears as she moans and desperately rubs her clit. He's pounding her hard and fast, and she cums quickly, but clearly she isn't satiated judging by how quickly she goes back to slamming her ass against the scientist after cumming. Eventually the sight of it is too much for the presenter, who mouths "fuck it" before hiking up the bottom of her dress to her hips revealing a beautifully puffy pussy and a carefully-sculpted landing strip. The presenter shifts over on the couch, and pulls the nun by her hair to make her eat her cunt. They go on like this for some time, with the nun and presenter frequently changing places, much to the delight of the scientist. By the end of the scene the nun is crying on the floor, leaking cum from every holy hole and staring off into space. The benefits of aphrodisiacs are quite clear.</p>`);
					return r.join(" ");
				}
			},
		]
	}],
	[15, {// The Pirate Channel
		tags: {},
		loop: true,
		intro: ``,
		episode: [
			{
				get text() {
					const r = [];
					r.push(`aka the Pirate channel.`);
					r.push(`<p>You're greeted by a man with an eyepatch, a bushy black beard, and a crimson bandanna around his head. He's sitting behind a crude looking bamboo desk. Behind him is the backdrop of a sun rising over the ocean and two slaves in tight revealing sailor outfits swabbing the deck. The whole set looks like some sort of tropical pirate theme and you almost change the channel mistaking the show for a kids show when it catches up to you what the pirate is talking about.</p>`);
					r.push(`<p>"– An' that be concludin' our special report on the dangers o' dealin' with old world customs agencies an' how to find a scallywag'll right proper let you sneak a bound wench through fer the right bribe. If'n you missed it or be needin' a refresher, catch our rebroadcast in 12 bells time. Now afore the turn of the hourglass we go to our weatherwench Lusty Pearl who's been keepin' a weather eye on the horizon. Lusty?"</p>`);
					r.push(`<p>The camera cuts to a young blonde girl with her hair braided back in rows. She's wearing a white blouse that's unbuttoned all the way down to her leather corset showing much of her very large rack while hiding little.</p>`);
					r.push(`<p>"Thank ye, Captain Castbeak!" she positively beams with energy as she bounces around, her barely contained breasts keeping your eye as she sways and jumps around the screen.</p>`);
					r.push(`<p>"Today we be keepin' an eye on the acid rain storms as they blow on through the upper Chinese and Mongolian regions on their way to the Bering Strait. If ye be located anywhere around here —" She stretches up with a short pointer that you now realize is part of a prosthetic limb attached to her right hand. "— batten down yer hatches an' wait fer the storm ta' blow over".</p>`);
					r.push(`<p>The camera shifts down low now as the green screen map behind her shifts to Australia, Lusty stooping over towards the camera to stay in frame gives you a beautiful view straight down her blouse. "And if'n ye be in Australia yer in for another hot and dry one as this unseasonable drought stretches on fer at least another week."</p>`);
					r.push(`<p>The camera angle switches again as the map of North America comes on screen overlaid with temperatures. Lusty slowly straightens up and stretches out with a smile clearly giving the camera a show. "An' if'n ye be travelin' across here, beware, this be the worst weather of them all, with dust storms and tornadoes and lightning storms across the continent. If ye be catchin' our broadcast from here, seek a safe port and stay safe." she points again with her pointer hand all across the Midwest.</p>`);
					r.push(`<p>The weather report continues with more mundane temperature readings and Lusty bubbly bouncing around the screen giving you something to pay attention to when the weather is not about your region.</p>`);
					r.push(`<p>When the weather finishes, she crosses her arms under her breasts, emphasizing the pair barely restrained by the laces of her blouse and barely slipping free after her energetic report, as credits of strange and funny pirate themed names begin to flash across the bottom of the screen, she happily begins to sign off. "We here at Pieces o' Eight thank ye fer trustin' us with yer global news an' weather, from our crew to yours, have a merry day!"</p>`);
					r.push(`<p>You flip off the TV. News from a pirate, how novel.</p>`);
					return r.join(" ");
				}
			},
			{
				get text() {
					const r = [];
					r.push(`the pirate themed channel. Apparently this is a live feed produced by a band of pirates and you tuned in right as they board a small pleasure craft.`);
					r.push(`<p>Three armed pirates are swiftly sweeping the boat, gathering the passengers, a man, his wife, and his two children, on deck and tying them up. The camera is attached to the pirate captain as he sweeps below deck finding their supplies.</p>`);
					r.push(`<p>"Manta, this is Orca," the captain radios. "Looks like they were in for a long trip, there's boxes of supplies down here that would last them weeks."</p>`);
					r.push(`<p>"Aye, Captain Orca. Fleeing ol' world collapse seems like." The reply comes through on the radio. "Don't rightly know where they were headin' to, maybe to Tortuga to be citizens, maybe to another country. Sure is a nice boat though."</p>`);
					r.push(`<p>"Shit, Manta. 'Don't rightly know.' Don't tell me you're buying into this pirate crap too." The third crewmember chimes up.</p>`);
					r.push(`<p>"I think you're just mad that your callsign is 'Cuttlefish'," Manta shoots back.</p>`);
					r.push(`<p>"I've had worse," Cuttlefish replies, then mutters quietly "but not by much."</p>`);
					r.push(`<p>"I dunno, mate. As an accent it's kind of infectious, especially since they got all the wenches in Tortuga speaking it. It makes the whole port kind of endearing."</p>`);
					r.push(`<p>"I can't argue with that. Pull one of them girls on my lap and listening to her squeal and squirm, and then they get all that grog in you... Let's just say I'm warming up to the place."</p>`);
					r.push(`<p>Orca shakes his head at the banter of his crew shaking the camera mount as well slightly before he turns to leave. He takes a step out before suddenly freezing and stopping. He clicks on his radio and says "Radio silence for a minute."</p>`);
					r.push(`<p>Turning and heading towards the large crate of supplies marked 'bananas', he then takes a step back before giving the crate a swift kick producing a high pitched yelp. "Boys, I think our score is bigger than we thought. Get down here and —"</p>`);
					r.push(`<p>"Uh, captain, you better get up here, we got trouble." Manta's voice comes back.</p>`);
					r.push(`<p>"Fuck, Capt'n, It's the Viklanders." Cuttlefish says over a backdrop of gunfire.</p>`);
					r.push(`<p>Captain Orca rushes up the stairs to reveal over the aft the approach of a viking ship. Standing at its prow a blonde man covered in blue woad tattoos shouting wildly and firing two automatic rifles off into the air. The screen stops there with a "to be continued" overlaid on the screen.</p>`);
					return r.join(" ");
				}
			},
		]
	}],
	[16, {// Channel
		tags: {dicks: true},
		loop: true,
		get intro() {
			// All actors are at least 18
			const r = [];
			r.push(`<p>As you snuggle in for the night`);
			if (S.Concubine) {
				r.push(`with your concubine, you`);
			} else {
				r.push(`you`);
			}
			r.push(`begin watching the <i>Age of Slavery</i> channel. With so many new types of arcologies emerging, it's sometimes difficult to tell if you are watching events unfolding on a set or in a real arcology with a historical society.</p>`);
			return r.join(" ");
		},
		episode: [
			{
				get text() {
					const r = [];
					r.push(`<p>"Well, you did well to win the 'cleanest urchin' contest."</p>`);
					r.push(`<p>Currently you seem to be watching a scene from the industrial revolution, in a smoke smudged brick courtyard by a factory. A stout manager, dressed in a black suit, is leading a thin urchin toward a wooden building built out from the main factory.</p>`);
					r.push(`<p>"Thank you, sir," the urchin gulps. "My mother really needs the money. You promised a shilling?"</p>`);
					r.push(`<p>"And I really need to recover these bearings!" The stout man proclaims. "I'm surprised you were so modest, though. Someone with skin as pure as yours doesn't need to be ashamed of it."</p>`);
					r.push(`<p>"Uh, I'm fair like my mother, sir." The waif hugs their arms around their chest.</p>`);
					r.push(`<p>"Well she must be helping keep you clean, boy!" The man laughs, and flings open the door to the outbuilding, revealing a series of tanks about three times as tall as he is.</p>`);
					r.push(`<p>"This one right here," he taps the nearest, "is almost full of water. However, the blasted mixer for the tank has fallen apart." There is enough light entering from the door to show a belt driven mixer hanging above the tank, with a missing plate and empty sockets. "The bearings are about`);
					if (V.showInches === 2) {
						r.push(`an inch`);
					} else {
						r.push(`three centimeters`);
					}
					r.push(`across, and fell right in the damn tank. I can't drain the tank without those bearings because they're valuable, and I can't foul the drain. But I can't seem to fish them out either, it's too dark. That's why I needed someone clean, someone that won't get their filth in my tank. There's a shilling if you can get me back all eight of my bearings in ten minutes."</p>`);
					r.push(`<p>"Just ten minutes sir?"</p>`);
					r.push(`<p>"Time is money. Now strip."</p>`);
					r.push(`<p>The urchin hesitates.</p>`);
					r.push(`<p>"Still shy?" the man leers.</p>`);
					r.push(`<p>"I'll do it." The youth strips off his shirt and steps inside, shutting the door before dropping his trousers.</p>`);
					r.push(`<p>"Hand me your clothes then, NOTHING IN MY TANK." The man grumps.</p>`);
					r.push(`<p>The camera cuts inside to show a dim black and white view of the youth's nude silhouette scrambling up the tank, fumbling with the lid and slipping inside. They pass up a series of bearings quickly for a while, but seem to struggle to find the final ones.</p>`);
					r.push(`<p>"TIME!" Calls the man, holstering his pocket watch.</p>`);
					r.push(`<p>"Sir, I can't find the last two!" The youth splutters.</p>`);
					r.push(`<p>"Can you find the fucking holes!?!" the man roars.</p>`);
					r.push(`<p>"E-eight..." the lad responds, crestfallen.</p>`);
					r.push(`<p>"Then here's the deal. Let's make it interesting. I will double your wages. Double them! Two shillings! If you can find your own fucking asshole and shove the six you have in there, then find the last two. Sloppy idiot."</p>`);
					r.push(`<p>The youth freezes. "Sir?"</p>`);
					r.push(`<p>"You heard me. You're not losing those; polish them! I'm not even peeking, keep your precious privacy."</p>`);
					r.push(`<p>You can see the hesitation in the outline of the desperate youth, then a slump of the shoulders. "Yes, sir."</p>`);
					r.push(`<p>Perched on top of the tank, they bend over with their hand on the mixer and begin inserting the bearings into their new housing. They are each about an inch wide, and the first takes quite some time.</p>`);
					r.push(`<p>"Hurry up, damn it!" the man roars.</p>`);
					r.push(`<p>The urchin jumps, and then jumps again as the bearing slips home. They freeze for a moment, trembling. Then begin pushing in the others.</p>`);
					r.push(`<p>"WELL?"</p>`);
					r.push(`<p>"They're in, sir," he responds weakly, and slips into the tank. The man harrumphs and starts examining his watch again. After a few minutes have passed, the lad pops up with the seventh bearing, and then returns to the bottom. They're clearly holding their breath as long as they can.</p>`);
					r.push(`<p>"TIME!" The man roars again.</p>`);
					r.push(`<p>Spluttering, the youth surfaces. "I-I... I can't find it!" he cries desperately. Splashing his way out of the tank and scrambling toward the door, he pauses to force down a sudden erection. The man flings open the door, letting daylight stream in and briefly washing out the black and white camera. His pants are also open and showing an erection raging as fiercely as he is.</p>`);
					r.push(`<p>"Then you need some blasted motivation! I'll pack those bearings in myself!"</p>`);
					r.push(`<p>The youth shrieks, and in a panic sprints around the tank. The man follows closely, and then chases him out the door. With no time to grab his clothing, the youth squirts out bearings as he runs, before making the relative safety of the street, still nude. A camera from the street reveals an interesting surprise as the desperation on the fleeing youth's face shifts to consternation. Heads on the street turn, too, as he drops the last bearings and spurts white over coal black skin. There was more than water in the tank: he's dyed now as black as night from head to toe.</p>`);
					r.push(`<p>Pointing and laughing uproariously, the man flips the eighth bearing into the air before pocketing it again and buttoning up his pants. The camera pans out to show the factory's name as "Titan's Textiles."</p>`);

					return r.join(" ");
				}
			},
			{
				get slaves() {
					return [App.Data.FCTV.actors.littleCloud];
				},
				get text() {
					const r = [];
					r.push(`Today's show seems to be a Western of some sort, named "Steerswood". The sun is beating down on a young Indian woman standing on a scaffold with a noose around her neck. Her lower arms are bound tightly to each other behind her back keeping her hands free but unable to reach anything. The ropes squeeze her modest breasts so they poke out further than they usually would, and she is forced to stand on tiptoe to avoid choking. Around her are three women who evidently live in the town. They seem to be outraged at the Indian girl.`);

					r.push(`<p>"You fucking whore!" the first one, a blonde, screams.</p>`);
					r.push(`<p>"Tell her, Annie!" the second one chimes in.</p>`);
					r.push(`<p>"I am sick and tired of you. Thieves!" She jabs a trapped breast with her finger to punctuate her words, "Stealing our husbands with your harlotry."</p>`);
					r.push(`<p>"I beg you," the Indian girl replies, "it's very urgent. We are all in great danger! The great Bird..."</p>`);
					r.push(`<p>"Listen to this bitch, Dakota." Annie turns to the second woman. "We are all in great danger," she mimics. She turns back to slap the Indian. "Little Cloud, was it? I don't give a SHIT about the coming of your bird god. The greatest danger my husband has right now is ME. And right now, YOU are in danger for stealing him, bitch."</p>`);
					r.push(`<p>Frantically the girl twists to face the third woman, with a crown of red hair and freckles. "You are Kate, yes? Please, tell them I have done nothing." Kate looks up for a moment, saying nothing. "Your men, they don't even look at us. When they come to the village, they only have eyes for..."</p>`);
					r.push(`<p>In a flash, Kate is choking her. "How DARE you. How DARE you insinuate that my husband is some PERVERT. He is a doctor, and can heal man or beast. I trust you can at least respect a 'medicine man'?"</p>`);
					r.push(`<p>Annie punches one breast, while Dakota slowly twists the nipple on the other one. Cloud shrinks into silence under the assault.</p>`);
					r.push(`<p>"You know what I am thinking, girls," Dakota muses. "I am thinking this might be an honest mistake." The heads of the other two snap around. "Hear me out. I am wondering if she honestly thinks she's not a whore, simply because she doesn't look like one."</p>`);
					r.push(`<p>The others pause for a moment, then start to laugh. "Ahh, I see where this is going. We could teach her. Yes, let's 'help her out'."</p>`);
					r.push(`<p>Kate pulls out a large makeup kit. "Ordered from Sears and Roebuck by my husband, as a 'makeup' present for his dalliances. For all the times I used it I never got his attention. But you know, maybe I just never used <i>enough</i>."</p>`);
					r.push(`<p>The camera pans away and when it returns, the Indian girl's face is positively caked with the most absurdly overdone makeup you have ever seen. It's both hot and hilarious in the same way.</p>`);
					if (S.Concubine && S.Concubine.makeup > 0) {
						r.push(`<p>You look at your own concubine's face. ${App.Desc.makeup(S.Concubine)}It's just the way you like it, but it's nowhere near as messy and overdone as the girl in the show.</p>`);
					}
					r.push(`<p>"Mmmm, good but now the rest of her seems a little plain," Annie frowns. "Don't loose girls wear big boots?"</p>`);
					r.push(`<p>"I can help with that," Dakota smiles.</p>`);
					r.push(`<p>"You've got boots?"</p>`);
					r.push(`<p>"Nope, but I can get her some big red ones." She returns quickly, holding up a large bucket. "You see, my husband has left me to fix the barn all by myself. Waterproofing with pitch, fixing boards, and painting the wood!"</p>`);
					r.push(`<p>The girl squirms, but Dakota and Annie dive in with big sweeping strokes and large brushes. "Leave her bush and asshole clean for customers," giggles Dakota. "As clean as a whore's holes can be," corrects Annie.</p>`);
					r.push(`<p>They step back to inspect their work. "Looks like a whore to me," Kate says.</p>`);
					r.push(`<p>The girl is clearly exhausted and struggling to stay on her feet. Sweat is rolling down her face, and her makeup is already beginning to run around her eyes. Her legs are barn red from her hips to the tip of her toes, and a small puddle of paint is forming under her feet and between her toes. Sweat is pouring off her naked body.</p>`);

					r.push(`<p>"You know." Annie frowns. "She still really doesn't look like a whore to me. Shouldn't she be showing her skills? Spreading her legs?"</p>`);
					r.push(`<p>In a moment they have a barrel set up on end, somewhat behind her and also partly under her. While it is too low for the girl to sit on, the smooth handle of a broken pitchfork is nailed to the side of the barrel and sticking up above it. "Here we go." Annie and Dakota each lift a leg, while Kate crouches down and adjusts the height of the barrel with a few shims, then guides the shaft towards the Indian's crotch. She brushes it slowly against her ass, tickling her hair. Little Cloud freezes, petrified. "Here, then?" Kate asks with a sinister smile, as she slides it forward.</p>`);
					r.push(`<p>"Please no, I'm a v-"</p>`);
					r.push(`<p>Both women drop her legs at the same time, and the girl screams as she tries to catch herself. The intruder does not make it far into her vagina as long as she stays on tiptoe, but she clearly can't lift herself high enough to get off the makeshift dildo entirely. And the noose around her neck keeps her from moving in any lateral direction.</p>`);
					r.push(`<p>"Ahhhh hahaha," the women laugh. "A virgin? YOU? After all you all did to steal our husbands, you harlot?"</p>`);
					r.push(`<p>Annie bursts out laughing. "Sorry, she still doesn't look like a whore to me. What a failure as a woman. I can't imagine any man falling for such a sorry sight. But hearing her beg? With those red legs? She's more like one of my pathetic chickens. Cluck cluck!" She laughs hysterically.</p>`);
					r.push(`<p>"A chicken, hmm?" Dakota ponders for a moment. "Annie, what if we..." she whispers in her ear.</p>`);
					r.push(`<p>Another quick pass of the camera and everyone is back in the middle of town.</p >`);
					r.push(`<p>"Oh, I am going to enjoy this, bitch," Dakota says. She lifts a brush from a new bucket that seems to shimmer with a slight haze. "I fucking hate this stuff. It should be HIS job. Hurts when you get it on your skin until it cools, and it <i>never</i> comes off. Have you ever had pitch on your skin, bitch? Have you ever had it in your <i>hair</i>?"</p >`);
					r.push(`<p>Dakota pauses for a moment to let the pitch drip into the bucket, then approaches the terrified girl. She starts to brush onto the crown of the girl's head and lets it run down her twin black braids. It's not hot enough to burn skin permanently, but certainly warm enough to smear around before it sets as a tacky mess. Dakota begins to work in earnest, using the brush to work it into the hair itself, then around the sides of her face, into her ears, down her neck and around her breasts. She covers everything down to her red "boots" and sex, leaving just the face and breasts bare.</p>`);
					r.push(`<p>"Surprise!" yells Annie from behind, emptying out an enormous bag of feathers over the pitch and turning her from dark to white in an instant. The women collapse to the ground in hysterics, barely able to contain themselves. "She's a chicken... with boobs!" one gasps. "A whore chicken."</p>`);
					r.push(`<p>"Let's see her steal the roosters NOW!"</p>`);
					r.push(`<p>The girl writhes in heat and discomfort and twists for some time, begging for freedom. Finally, she coughs and gasps "Please. At least, give me something to drink."</p>`);
					r.push(`<p>"Well shucks, ladies. If we haven't forgotten our hospitality. After all, we must be on our manners even if she ain't." "Who <i>hasn't</i> forgotten to water chickens?" "Can't have her messing their watering dish though."</p>`);
					r.push(`<p>All three turn to the girl. "Well as it happens we have just the thing for you. Steerswood Tea!" Kate holds up a very large skin apparently full of liquid from the way it sloshes around. Perhaps`);
					if (V.showInches === 2) {
						r.push(`several liters`);
					} else {
						r.push(`a gallon`);
					}
					r.push(`or more? It's an unusual shape. Then she turns it a little so everyone can see the nipple. It's a buttplug, about`);
					if (V.showInches === 2) {
						r.push(`3 inches`);
					} else {
						r.push(`7 centimeters`);
					}
					r.push(`in diameter it seems, with a short but stiff rubber hose coming from the tip.</p>`);
					r.push(`<p>The girl is stirred to new energy, and everyone is treated to the comical sight of the chicken choking and flopping around. In the end though, she has nowhere to go and Dakota plops the skin down on the barrel. Katie adjusts the wedges at the bottom of the barrel again, while Annie tends to the rope.</p>`);
					r.push(`<p>"Steerswood tea," Katie explains, "is a special drink we have made just for you. Plenty to drink, which you wanted, yes?"</p>`);
					r.push(`<p>"Yes, but..."</p>`);
					r.push(`<p>"And you Indians looove that firewater, right?"</p>`);
					r.push(`<p>"I was always too young to..."</p>`);
					r.push(`<p>"But the magic sauce is a little something that each one of us has contributed." The woman all giggle.</p>`);
					r.push(`<p>"W-water?"</p>`);
					r.push(`<p>"There's plenty of water <i>in</i> it," Dakota concedes. She brushes the plug and tube with pitch and tickles Cloud's asshole for a bit before suddenly pushing the tip inside.</p>`);
					r.push(`<p>After some adjustments, the new game becomes clear. The dildo is no longer enough to keep her from sinking, so she rests on the buttplug. The buttplug is far too large to enter her rear and is coated in pitch, making inward progress even slower. However, the buttplug(and her aching rear) is resting on the bladder full of tea. The lower she sinks, the more "tea" she injects into her own asshole, and she has no room to expel the sticky intruder.</p>`);
					r.push(`<p>She frantically rocks up and down, trying to find some new position to escape her discomfort. Tears and drool roll down her face and her makeup is now running down her neck.</p>`);
					r.push(`<p>The women laugh at her new predicament for a while, before hitting her red legs with switches. The girl sinks lower and lower in despair as her abdomen swells larger and larger, growling and bubbling as it swells.</p>`);
					r.push(`<p>"How do you like our hospitality now?" "Think you'll be back soon to tease our husbands?"</p>`);
					r.push(`<p>Little Cloud lets out an enormous wet belch, then two more as she strains her body.</p >`);
					r.push(`<p>"Hahahaha, her breath smells like whiskey and," Annie says as she eyes Kate, "You, to be frank." They both burst out laughing again.</p >`);

					return r.join(" ");
				}
			},
			{
				get slaves() {
					const slave = App.Data.FCTV.actors.littleCloud;
					slave.hStyle = "messy";
					slave.shoeColor = "#c80000";
					slave.shoes = "boots";
					slave.skin = "dyed gray";
					return [slave];
				},
				get text() {
					const r = [];
					r.push(`<p>Today's show seems to be a continuation of Steerswood. The sun is still beating down on a young Indian woman standing on a scaffold with a noose around her neck. However, she is in a terrible predicament. Surrounded by three jealous women from the town tormenting her, she has been dressed as a chicken through tarring and feathering, and is currently absorbing a large amount of mysterious "tea" through her asshole.</p>`);

					r.push(`<p>"Pleathe, *hiccup*, Thurrr.. shty," Little Cloud murmurs.</p>`);
					r.push(`<p>Annie slaps her on the breast. "After all we did for you, making that tea and giving it to your sorry ass."</p>`);
					r.push(`<p>"It's fine." Kate holds up a collection of rubber tubes. "My doc has too many of these anyway. I always did love helping him with the enemas." She soon has it attached near the base of the buttplug, and then running`);

					if (V.seePee !== 0) {
						r.push(`a short distance before it splits. "This much fluid in her bowels, the bladder fills fast. You have to let it drain." She explains as she grabs one end. "Ahh."</p>`);
						r.push(`<p>"Normally we use a smaller one for this, but, well, whores love this sort of thing." She coats the tip in pitch as well, and then shoves the tube into the Indian's urethra. "Oh, she likes that!" Annie exclaims, as Little Cloud bounces and writhes around for just a moment before she realizes that her bladder is now caught in the same terrible tides as her ass.</p>`);
					} else {
						r.push(`about an arm's span.</p>`);
					}

					r.push(`<p>"Then we just run this one up heeere." Katie waves the tip of the other tube in her face. Cloud shudders but keeps her mouth shut. "Oh, but you are so <i>thirsty</i>, right? Well, we had to do this for a man that damn near died to a mountain lion. Slept for three weeks before he started healing." Kate coats the tip in pitch again and then shoves it far up Cloud's nose. Cloud frantically dances at the discomfort as some of the pressure below is released, but freezes a moment later as an <i>extremely</i> unpleasant flavor arrives in her throat.</p>`);
					r.push(`<p>Kate deliberately kinks the hose to shut off the flow for the moment and presses the kink into Cloud's hand, before wrapping her fingers around it. "Up to her now where she wants it," Kate explains. "It's important to give a patient choices, don't you think?" The gagging Indian tries to use her new grip on the hose to pull it out, but Kate bends her fingers painfully further shut. "Uh-uh. Nope." Kate firmly knots another rawhide band around the hose, and then ties the strip around Cloud's wrist, keeping her from reeling in the hose with her fingers. With her arms themselves bound, she can't move around enough to tear out the hose either. "Medicine goes up or down, not out!"</p>`);

					r.push(`<p>At this point, her stomach is so distended that the black pitch is showing around individual feathers. Annie and Dakota lock eyes and giggle, while Kate moves to where the noose is tied.</p>`);
					r.push(`<p>"Ready?" They ask the girl. She can barely open her eyes and doesn't move her head. "Ok then, here we go!"</p>`);
					r.push(`<p>Kate loosens the rope just as Annie and Dakota each lift a leg. With nothing else to support her, the girl's full weight comes to bear on the plug, which finally smears its tarry way home with a "pop." The Indian girl screams and shudders with an impossible... orgasm?</p>`);

					r.push(`<p>Annie releases the noose from the scaffold and shoves her over on her back. "You LIKED that? You disgust me." She is powerless to move, and lays there groaning and drooling beneath the weight of her stomach.</p>`);
					r.push(`<p>"Better finish your drink, little chicken." Dakota wrings out the skin, and the liquid has nowhere to go but in. She neatly wraps rawhide around the bag to make sure the inflation can't reverse, and then covers the whole thing with pitch. It will not be coming undone soon.</p>`);

					r.push(`<p>"You know, her cunt looks empty now. We should give our little hen something to bring back to her chicks." Dakota suggests.</p>`);
					r.push(`<p>"I have just the thing!" Annie lifts up a third bucket with a trowel that appears to contain a selection of`);
					if (V.seeBestiality === 0) {
						r.push(`<i>nuts and seeds.</i>`);
					} else {
						r.push(`nightcrawlers.`);
					}
					r.push(`"</p><p>Perfect for growing birds."</p>`);
					r.push(`<p>She carefully parts the labia with the muddy trowel, then checks to see how deep it can go. "There we go!" Annie proclaims as she slides it to one side and begins tipping in`);
					if (V.seeBestiality === 0) {
						r.push(`<i>birdseed.</i>`);
					} else {
						r.push(`worm after worm.`);
					}
					r.push(`</p><p>When she seems to run out of room, she begins to push them in by hand. After the bucket is low enough, she carefully pulls out her trowel and Dakota seals the slit shut with pitch. Katie recovers Cloud's loin cloth, which they fix as tightly as they can, and secure the knots again with pitch. There is no room at all to push anything out, and she cannot wriggle her loincloth past her hips. Her hands remain tightly bound behind her back, and her enormous stomach makes anything agility related impossible.</p>`);
					r.push(`<p>"You know, I don't think she could see us on the other side of the 'mountain'." Annie aims a kick at the stomach and then tips the rest of the bucket on Cloud's face.</p>`);
					if (V.seeBestiality === 0) {
						r.push(`<p>"<i>Shunflower sheedsh!</i>`);
					} else {
						r.push(`<p>"Bugsh!`);
					}
					r.push(`No! I hate`);
					if (V.seeBestiality === 0) {
						r.push(`<i>shunflower sheedsh!</i>"`);
					} else {
						r.push(`bugsh!"`);
					}
					r.push(`</p><p>Cloud somehow finds strength to squirm frantically and scream, rocking her arms back and forth trying to free them. She freezes again, suddenly aware of the wriggling in her vagina, then thrashes and screams even more.</p>`);
					r.push(`<p>"Shut UP already!" Annie is irate. "I am done hearing you whine about what you like and what you don't like. We gave you drink, we gave you food. Shut. Your. Beak!" Annie rams the round handle of the trowel deep into Cloud's mouth, then ties the middle of the trowel tightly with rawhide before fastening it behind her head. She bends the metal to point down a bit. "See? Silence. And a beak!"</p>`);

					r.push(`<p>"One lasssst thing, though." Kate holds up a few boards. "She doesn't quite have chicken feet!" Using the noose the three haul Cloud's bulk upright, and place her feet on the boards. Careful not to pierce the skin or smash the toes, Kate uses U-shaped nails to firmly trap the girl's toes to the board, giving her comically large "sandals." Another coat of thick red paint on the boards, nails, and legs, and her new feet are finished.</p>`);
					r.push(`<p>Finally, their work is done. Little Cloud is completely unrecognizable. Her face is a slobbery mess, and it's not clear if she is still drooling or if she has begun to leak tea from her mouth. She gives another wet belch, and slouches to the side. Her breasts are the only naturally colored thing left on her body, still trapped and protruding from the now hidden ropes that bind her. Her stomach is so grossly distended that the pitch is showing, giving the impression that her skin is black. The bulge at the back of her loincloth has picked up a few feathers and looks like a sad tail. Her cunt is leaking a single`);
					if (V.seeBestiality === 0) {
						r.push(`<i>sunflower seed</i>`);
					} else {
						r.push(`wriggling worm`);
					}
					r.push(`around the loincloth, with many more trapped inside. And her long slender legs are fixed to boards in a mockery of feet.</p>`);
					r.push(`<p>"Enthing...” she slurs around the trowel. "Ethrything ith..."</p>`);

					r.push(`<p>"Oh it's ending all right." Annie says. "Right, here is how this goes. You are out of here. History. None of us want to touch your filthy sticky hide. If you don't want to <i>pop</i>, I suggest you get back to your little teepee and find someone that cares to help you. If you hurry, you might make it before sundown."</p>`);
					r.push(`<p>"Right," Dakota agrees. "But if you happen to see one of our husbands on the way. If you find one in that fucking little village of yours. <i>If you let him touch your disgusting chicken ass</i>. We will see the pitch on him and <i>know</i>."</p>`);
					r.push(`<p>"May your bird god help you if that happens." Katie chimes in.</p>`);
					r.push(`<p>"Understand?" The three whip her taut stomach like a tom-tom.</p>`);
					r.push(`<p>"Arghhhh! Yershhhhh!"</p>`);
					r.push(`<p>Dakota leans in. "Now cluck! Cluck like a chicken!"</p>`);
					r.push(`<p>Cloud groans deeply, then tries to make a clucking sound around the trowel.</p>`);
					r.push(`<p>"Louder!" Dakota beats the drum again.</p>`);
					r.push(`<p>"Uck! Uck!"</p>`);
					r.push(`<p>"Now RUN, little chicken!"</p>`);
					r.push(`<p>Little Cloud frantically begins to flop and cluck her way out of town into the sunset as fast as she can, chased by the three hysterical women.</p>`);
					return r.join(" ");
				}
			},
		]
	}],
]);
