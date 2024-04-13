App.Events.pBadBreasts = class pBadBreasts extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	actorPrerequisites() {
		return [[
			(s) => ["breast injections", "intensive breast injections", "hyper breast injections"].includes(s.drugs)
		]];
	}

	eventPrerequisites() {
		return [
			() => V.plot === 1,
			() => V.badB !== 1,
			() => App.Events.effectiveWeek() >= 52,
			() => V.seeHyperPreg === 1,
			() => V.seePreg !== 0,
		];
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {He, him} = getPronouns(slave);

		cashX(500 * V.slaves.length, "event");
		V.badB = 1;
		V.slaves.forEach(function(s) {
			if (["breast injections", "hyper breast injections", "intensive breast injections"].includes(s.drugs)) {
				healthDamage(s, Math.floor(Math.random() * 2 + 1));
			}
		});
		let r = [];
		r.push(`Early one morning, you hear heaving coming from one of the bathrooms. On investigation, it seems that ${slave.slaveName} woke up feeling terribly nauseous. ${He}'s in no danger, but you've hardly checked ${him} over before more slaves stagger in. Every one of your slaves on breast-focused A-HGH has been struck by the mysterious malady and has <span class="health dec">sickened.</span>`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`It doesn't take much investigation before you find other slaveowners reporting the same thing. Elementary detective work fingers a particular drug supplier as the culprit, and before long the unfortunate pharmaceutical concern is drowning under a rain of harsh public comment and harsher private contract warfare. As the day wears on, the poor slaves feel much better, and appear positively glowing. However, their breasts swell slightly and their bellies bulge, pointing to the issue being the contamination of the A-HGH production line with fertility agents.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The firm promptly pays <span class="cash inc"> a large compensation</span> for potentially ruining your slaves. However, you're left with the matter of all the growing bellies to deal with. Over the week, all of your slaves on breast injections show signs of <span class="pregnancy">early pregnancy,</span> and hyper pregnancy at that, save those who aren't fertile. They just experienced some hip and ass growth. You have no idea how much fertility agent was in the enhancers but you feel they may become a problem if left alone!`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`The emotional distress isn't worth the trouble`, keepPreg),
			new App.Events.Result(`Demand further compensation`, wantMoney),
			new App.Events.Result(`Force surgical repairs and compensation`, repair),
		]);

		return node;

		function keepPreg() {
			for (const slave of V.slaves) {
				if (slave.drugs.includes("breast injections")) {
					const isIntense = slave.drugs.includes("intensive");
					const isHyper = slave.drugs.includes("hyper");
					if (canGetPregnant(slave) && slave.vagina !== 0) {
						slave.preg = 1;
						if (isIntense) {
							slave.pregType = random(15, 35);
						} else if (isHyper) {
							slave.pregType = random(20, 45);
						} else {
							slave.pregType = random(10, 25);
						}
						slave.pregKnown = 1;
						slave.pregWeek = 1;
						SetBellySize(slave);
					} else {
						slave.lactation = 1;
						slave.lactationDuration = 2;
						if (slave.geneMods.NCS === 0 && slave.hips < 1) {
							slave.hips++;
							if (isHyper) {
								slave.butt += 2;
							} else {
								slave.butt++;
							}
						}
						if (V.precociousPuberty === 1) {
							if (slave.pubertyXX === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
								if (isIntense) {
									slave.pubertyAgeXX -= 1.5;
								} else if (isHyper) {
									slave.pubertyAgeXX -= 2;
								} else {
									slave.pubertyAgeXX--;
								}
								if (slave.geneMods.NCS === 1) {
									if (isIntense) {
										slave.pubertyAgeXX -= 0.75;
									} else if (isHyper) {
										slave.pubertyAgeXX -= 1;
									} else {
										slave.pubertyAgeXX -= 0.5;
									}
								}
							}
							if (slave.pubertyXY === 0 && slave.balls > 0) {
								if (isIntense) {
									slave.pubertyAgeXY += 1.5;
								} else if (isHyper) {
									slave.pubertyAgeXY += 2;
								} else {
									slave.pubertyAgeXY += 1;
								}
								// NCS reduces the male puberty slowing affects
								if (slave.geneMods.NCS === 1) {
									if (isIntense) {
										slave.pubertyAgeXY -= 0.75;
									} else if (isHyper) {
										slave.pubertyAgeXY -= 1;
									} else {
										slave.pubertyAgeXY -= 0.5;
									}
								}
							}
						}
						if (slave.geneMods.NCS === 0) {
							slave.boobs += 300;
						} else {
							slave.boobs += 150;
						}
					}
				}
			}
			return `Since subjecting all the affected slaves to abortions would cause you severe losses, you've decided to let them keep the pregnancies. You hope you are prepared for all the children you'll be producing. Those who couldn't become pregnant <span class="change positive">gained some breast, hip and ass size,</span> as well as <span class="change positive">began lactating.</span>`;
		}

		function wantMoney() {
			cashX(2000 * V.slaves.length, "event");
			return `You muster all the contractual remedies available to you and join the crowd of slaveowners laying into the hapless manufacturer. Of course, with so many attackers, there is as much infighting between them as conflict with the helpless enemy, since everyone knows the business will go bankrupt before everyone gets paid. Nevertheless you <span class="cash inc">approximately double</span> the money you make out of the situation, plenty to deal with the pregnancies.`;
		}

		function repair() {
			for (const s of V.slaves) {
				if (canGetPregnant(s)) {
					if (s.drugs === "breast injections") {
						if (s.geneMods.NCS > 0) {
							s.boobs += Math.floor(Math.random() * 10 + 1) * 50;
						} else {
							s.boobs += Math.floor(Math.random() * 10 + 1) * 100;
						}
					} else if (s.drugs === "intensive breast injections") {
						if (s.geneMods.NCS > 0) {
							s.boobs += Math.floor(Math.random() * 10 + 1) * 100;
						} else {
							s.boobs += Math.floor(Math.random() * 10 + 1) * 150;
						}
					} else if (s.drugs === "hyper breast injections") {
						if (s.geneMods.NCS > 0) {
							s.boobs += Math.floor(Math.random() * 10 + 1) * 200;
						} else {
							s.boobs += Math.floor(Math.random() * 10 + 1) * 300;
						}
					}
				}
			}

			return `The hapless manufacturer eventually goes bankrupt. However, you do manage to force surgical correction of the pregnancies before they do. As additional compensation, they agree to naturally enhance your afflicted slaves' busts knowing full well that most buyers are not interested in slaves that have been knocked up. At the managers expense, your slaves move through a top-flight surgeons care and are pregnancy free and sporting <span class="change positive">larger breasts.</span>`;
		}
	}
};
