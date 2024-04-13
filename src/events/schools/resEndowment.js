// cSpell:ignore Skoptic

App.Events.RESEndowment = class RESEndowment extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.cash > 50000,
			() => {
				for (const [school, data] of App.Data.misc.schools) {
					if (V[school].schoolUpgrade === 0 && data.requirements) {
						if (V[school].studentsBought > 1 || V[school].schoolPresent !== 0) {
							return true;
						}
					}
				}
			}
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		let weight = 0;
		for (const [school, data] of App.Data.misc.schools) {
			if (V[school].schoolUpgrade === 0 && data.requirements) {
				if (V[school].studentsBought > 1 || V[school].schoolPresent !== 0) {
					weight++;
					if (V[school].studentsBought > 2) {
						weight++;
					}
				}
			}
		}
		return weight;
	}

	execute(node) {
		let r = [];
		const missingSchools = [];

		for (const [school, data] of App.Data.misc.schools) {
			if (V[school].schoolUpgrade === 0 && data.requirements) {
				if (V[school].studentsBought > 1 || V[school].schoolPresent !== 0) {
					missingSchools.push(school);
				}
			}
		}

		/** @type {FC.SlaveSchoolName} */
		const selectedSchool = missingSchools.random();
		/** @type {FC.SlaveSchool} */
		const schoolData = App.Data.misc.schools.get(selectedSchool);

		if (selectedSchool === "TFS") {
			r.push(`You receive a personal call from an older member of ${schoolData.title}. Like all of the Sisters, she's very beautiful, but you know how to judge age through the most cutting-edge treatments, and you guess she's in her early forties. That makes her one of the most senior Sisters, at the age when mandatory enslavement will happen very soon for her. She doesn't seem preoccupied by the prospect, though the pair of gorgeous young women cooperating to suck off her enormous cock may have something to do with that.`);
			if (V.PC.slaveSurname) {
				if (V.PC.title) {
					r.push(`"Mr.`);
				} else {
					r.push(`"Ms.`);
				}
				r.push(`${V.PC.slaveSurname},"`);
			} else {
				r.push(`"${V.PC.slaveName},"`);
			}
			r.push(`she says forthrightly,`);
			if (V.PC.dick !== 0 && V.PC.vagina !== -1 && V.PC.boobs >= 300) {
				r.push(`"You've become quite famous among us.`);
			} else {
				r.push(`"${V.TFS.studentsBought} of my Sisters have left us for you. You seem interested in us, and are clearly very wealthy.`);
			}
			r.push(`I would like to ask you for help." She explains that a schism is developing within the Sisters over whether the ideal futanari should have balls. "This is a serious matter," she says. "We must agree on our goals. I believe a futa's pussy is most exquisite without testicles to obscure it." She stands up, displacing her attendants and bringing her genitalia into view. She has scarcely a trace of scrotum. "Sadly, removal of our balls would reduce our ability to remain erect, and reduce our sex drives. So, the solution is clearly to carefully calibrate our transformations to ensure that our testicles never descend, like mine; or if they have descended, to reverse that with surgery. With your support, I can make this vision predominate. I hope," she says, turning to give one of her attendants a tender kiss, "that this will make us more loving, as well."`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`Scarcely has the call ended than another comes in. It's another matron of the Futanari Sisters; she looks so much like her Sister that you are momentarily confused. "I know what my Sister said, and I know what she asked for," she purrs. She manipulates the video call controls, zooming the camera out. It reveals that she has her equally enormous cock in a much younger Sister's pussy; another attendant is lavishing oral attention on her testicles, which are comically big. "She's wrong. We are more beautiful with balls, and the bigger, the better." She shudders, pulling out to blow a gigantic load all over all three of them. Her erection does not waver for an instant as she transfers it to the other futa's anus. "We are sexually superior like this, too. Lust is better than love. Support me instead, I beg you."`);
		} else {
			r.push(`You receive a personal call from a senior representative of ${schoolData.title}. It seems the ${schoolData.nickname} is raising funds, and since you've already`);
			if (V[selectedSchool].schoolPresent === 0) {
				r.push(`purchased ${V[selectedSchool].studentsBought} of its ${schoolData.nickname}`);
			} else {
				r.push(`encouraged them to open a ${schoolData.branchName} in your arcology`);
			}
			r.push(`and are known to be wealthy, you are an obvious potential donor. Though the Free Cities' slave schools are of course for-profit institutions, they do their best to maintain a veneer of public service, and cast their efforts to improve their product as a benefit to slaveowning society as a whole.`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`"A generous donation," the representative insists, "would help us advance our mission to`);
			switch (selectedSchool) {
				case "TUO":
					r.push(`make slave children's dreams come true."`);
					break;
				case "GRI":
					r.push(`truly make the 21st century the century of biology."`);
					break;
				case "SCP":
					r.push(`build a reputation for infallible uniformity of product."`);
					break;
				case "LDE":
					r.push(`create a new paradigm in anal sluttery."`);
					break;
				case "NUL":
					r.push(`promote the Skoptic ideal."`);
					break;
				case "TGA":
				case "HA":
					r.push(`provide the very finest companions to persons of quality such as yourself."`);
					break;
				case "TCR":
					r.push(`provide the very finest livestock to persons of quality such as yourself."`);
					break;
				default:/* TSS */
					r.push(`provide good quality slaves at competitive prices."`);
			}

			r.push(`Getting down to the business advantages, he adds that "donors receive considerable price advantage on future ${schoolData.slaveNoun}," which seems to translate into a discount of around 20% once the sales language is stripped off it. You point out that's bordering on pointlessness to you, given your ability to purchase almost anything you wish; he hesitates, but then admits that "as our foremost supporter" you could use an endowment to guide school policy to an extent.`);
		}

		App.Events.addParagraph(node, r);

		const choices = [];

		if (selectedSchool === "TSS") {
			choices.push(new App.Events.Result(`Reorient the school to MILF training`, MILFTrain, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Endow better skills training`, skillTrain, `This will cost ${cashFormat(50000)}`));
		} else if (selectedSchool === "TUO") {
			choices.push(new App.Events.Result(`Stricter admission criteria`, stricter, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Encourage basic, theoretical sexual education`, basic, `This will cost ${cashFormat(50000)}`));
		} else if (selectedSchool === "GRI") {
			choices.push(new App.Events.Result(`Focus on curative research`, cure, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Support refined hormonal research to prevent shrinkage`, antishrink, `This will cost ${cashFormat(50000)}`));
		} else if (selectedSchool === "SCP") {
			choices.push(new App.Events.Result(`Endow a focus on loyalty at the cost of intelligence`, loyalty, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Support better skills training`, skillsUp, `This will cost ${cashFormat(50000)}`));
		} else if (selectedSchool === "LDE") {
			choices.push(new App.Events.Result(`Endow drug therapy designed to enhance infatuation`, infatuation, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Support refined hormonal research to prevent shrinkage`, shrinkageDown, `This will cost ${cashFormat(50000)}`));
		} else if (selectedSchool === "TGA") {
			choices.push(new App.Events.Result(`Endow an advanced training center to produce fanatical loyalty`, TGALoyalty, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Endow a combat training program`, combat, `This will cost ${cashFormat(50000)}`));
		} else if (selectedSchool === "HA") {
			choices.push(new App.Events.Result(`Support higher education training`, higherEd, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Focus on growth stimulants research`, growStim, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Focus on strongfat body type`, strongFat, `This will cost ${cashFormat(50000)}`));
		} else if (selectedSchool === "TCR") {
			choices.push(new App.Events.Result(`Encourage the sale of breeding bulls`, bulls, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Encourage the sale of heifers`, heifers, `This will cost ${cashFormat(50000)}`));
		} else if (selectedSchool === "NUL") {
			choices.push(new App.Events.Result(`Fund a training program for non-sexual skills`, noSSkills, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Fund a training program for sexual skills`, sSkills, `This will cost ${cashFormat(50000)}`));
		} else if (selectedSchool === "TFS") {
			choices.push(new App.Events.Result(`Fund the first matron`, TFSOne, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Fund the second matron`, TFSTwo, `This will cost ${cashFormat(50000)}`));
			choices.push(new App.Events.Result(`Patronize them without taking sides`, TFSGenerous, `This will cost ${cashFormat(50000)}`));
			if (V.cash >= 250000 && V.rep >= 10000) {
				choices.push(new App.Events.Result(`Propose a dynamic compromise that supports both visions`, TFSBoth, `This will cost ${cashFormat(250000)} and take 15 weeks`));
			}
		}

		if (selectedSchool !== "TFS") {
			choices.push(new App.Events.Result(`Make a generous contribution`, generous, `This will cost ${cashFormat(10000)}`));
		}
		App.Events.addResponses(node, choices);

		// TSS
		function MILFTrain() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You pause measuringly before forwarding facts and figures to the surprised representative. You matter-of-factly prove the school's shortsightedness in focusing on young slaves; it's a field with a lot of competition and brutal overhead. There's potential elsewhere: MILFs. They're never virgins and they go for lower prices, but their skills can be advanced without ruining them, and material costs are lower. After furious internal debate, the school agrees to your suggestion. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.TSS.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function skillTrain() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You and the representative discuss the school's focus on efficiency. You offer to endow a basic skill training program, and prove based on your own training methods that it won't unduly affect the low overhead and high volume the school relies on. The school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.TSS.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function generous() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You make a generous contribution to the school. It spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			cashX(-10000, "capEx");
			repX(5000, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		// TUO
		function stricter() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express your interest in making the orphanage's admission criteria stricter. You want them to only teach the most beautiful and intelligent children, and focus all attention on raising these select few. It spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.TUO.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function basic() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You propose giving the children a theoretical sex education, claiming that without it, their education is incomplete. The representative considers it, and agrees that it would be beneficial. It spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.TUO.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		// GRI
		function cure() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express your interest in the institute's curative research. The representative admits the field is notoriously difficult, but readily agrees that the institute could certainly focus on health to a greater extent than it already does; its surviving ${schoolData.nickname} will probably leave testing programs at a unique level of vitality. It spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.GRI.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function antishrink() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You introduce your plans to the representative by forwarding the records of the GRI ${schoolData.nickname} you've purchased and what you've done with them. His eyes widen at the profitability you've found in use of their already-impressive breasts to produce milk. The institute readily agrees to pursue the field by focusing more heavily on lactation and breast expansion. It spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.GRI.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		// SCP
		function loyalty() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous ${schoolData.nickname} on a physical level, but mention exasperation with the unfortunate tendency of some of them to question their place in life. You crossdeck a series of research reports that outline a method of reducing any girl to idiotic devotion. The representative is dubious, since it will reduce prices, but you point out the potential for commensurately reduced overhead, and the school eventually agrees. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.SCP.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function skillsUp() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You state general satisfaction with previous ${schoolData.nickname}, but mention some doubt about the school's focus on the physical to the exclusion of the mental. You outline a plan under which surgical recovery time could be used for low intensity training, and after reviewing it the school agrees to implement it without delay. It spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.SCP.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		// LDE
		function infatuation() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous ${schoolData.nickname}, but point out that on arrival, you found it necessary to do some additional work before they discovered their true calling as constant buttsluts. The representative quickly hides his incredulous glee as you crossdeck a series of research reports that suggest the potential for a pharmaceutical fix for this blemish. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.LDE.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function shrinkageDown() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You state general satisfaction with previous ${schoolData.nickname}, but express some regret that the hormonal treatments that feminize the school's products tend to impact certain amusing parts of their anatomy. The representative is dubious, since that minimization is a major part of the school's brand, but you wax rhapsodic on the advantages of a well-endowed bottom kept soft by hormones, and the school eventually agrees. It spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.LDE.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		// TGA
		function TGALoyalty() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous ${schoolData.nickname}, but point out that their mental conditioning is incomplete at best. The representative quickly hides his incredulous glee as you outline a basic plan for an advanced training center that would use refined versions of old world mental conditioning techniques to produce total loyalty. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.TGA.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function combat() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous ${schoolData.nickname}, but point out that in this uncertain world, it's important that every possible resource be used to defend slave society. The representative quickly hides his incredulous glee as you outline a basic plan for a combat training program that will make Gymnasium-Academy ${schoolData.nickname} lethal fighters that can be trusted not to use their talents to rebel. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.TGA.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		// HA
		function higherEd() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You and the representative discuss the academy's focus on raw quality. You offer to endow a better educational program able to enhance the mental faculties of the ${schoolData.nickname} without negatively affecting their physical development. The school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.HA.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function growStim() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous ${schoolData.nickname}, but point out that if they truly wish to distinguish themselves in the world, they need to focus on their trademark features. The representative quickly hides his incredulous glee as you outline a research program that will make Hippolyta Academy ${schoolData.nickname} powerful colossi. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.HA.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function strongFat() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous ${schoolData.nickname}, but point out that if they truly wish to distinguish themselves in the world, they need to focus on their trademark features. The representative quickly hides his incredulous glee as you outline a research program that will make Hippolyta Academy ${schoolData.nickname} strong yet graciously soft and feminine battlemaids. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.HA.schoolUpgrade = 3;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		// TCR
		function bulls() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous cows, but point out that once they give birth, it's up to you to do all the work in keeping them lactating. It quickly dawns on the representative that purchasers may want to buy a bull to keep their herd naturally milky. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slave milking.`);
			V.TCR.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}
		function heifers() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous ${schoolData.nickname}, but point out that it would be quite enjoyable to bring in their milk yourself. The representative tries to explain that they aren't ready yet, but quickly changes his tune when he hears how much you'll be sending their way. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slave milking.`);
			V.TCR.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		// NUL
		function noSSkills() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous ${schoolData.nickname}, but point out that their intense androgyny is likely to be off-putting for other buyers. The representative reluctantly agrees with your doubts, and enthusiastically agrees with your idea for an intensive training regimen to teach students how to show off for their betters. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.NUL.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sSkills() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You express general satisfaction with previous ${schoolData.nickname}, but point out that their lack of genitalia severely hinders their use as sex slaves. The representative reluctantly agrees with your doubts, and enthusiastically agrees with your idea for an intensive training regimen to teach students how to use their mouths and asses as sexual tools. The grateful school spreads <span class="reputation inc">word of your generosity,</span> using you as an example of investment in the future of slaveowning.`);
			V.NUL.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		// TFS
		function TFSOne() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You forward funds to the first matron. There is no response for a long time. When one comes, it's from the matron you supported. She looks more confident, if possible, and thanks you lovingly. She reports that the future of the Futanari Sisters is decided; every effort will be made to keep their balls as unobtrusive as possible. "The younger Sisters," she says approvingly, "seem more submissive and caring already." She has a pretty young futa in her lap, nibbling one of her elder's ears. "My opponent," the matron continues, "will not be available for enslavement, if you're wondering." She looks smug. "We have decided that since she suffers from an excess of concern for ejaculation, she will serve the rest of us as a cum producer. The way we have her restrained is similar to an industrial arcology dairy." She reaches offscreen, taking up a glass full of ejaculate. "This is hers," she says, and drains it. Mulling the taste, she looks thoughtful. "Hm," she says. "The taste isn't perfect, but if we improve that, it might reduce the volume. Though we could always increase the size of her anal stimulation to counteract that."`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`The grateful Sisters spread <span class="reputation inc">word of your generosity,</span> deflecting inquiries into their secretive world by praising you instead.`);
			V.TFS.schoolUpgrade = 1;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function TFSTwo() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You forward funds to the second matron. There is no response for a long time. When one comes, it's from the matron you supported. She looks more confident, if possible, and thanks you flirtily. She reports that the future of the Futanari Sisters is decided; every effort will be made to grow their balls as big as possible. "The younger Sisters," she says approvingly, "seem hornier already." She has a pretty young futa in her lap, bouncing lustily on her elder's cock. "My opponent," the matron continues, "will not be available for enslavement, if you're wondering." She looks smug. "We have decided that since she suffers from a lack of concern for ejaculation, she will serve the rest of us as a milk cow. The way we have her restrained is similar to an industrial arcology dairy." She reaches offscreen, taking up a glass full of creamy milk. "This is hers," she says, and drains it. Mulling the taste, she looks thoughtful. "Hm," she says. "The taste isn't perfect, but if we improve that, it might reduce the volume. Though we could always increase her dosage of breast expansion drugs to counteract that."`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`The grateful Sisters spread <span class="reputation inc">word of your generosity,</span> deflecting inquiries into their secretive world by praising you instead.`);
			V.TFS.schoolUpgrade = 2;
			cashX(-50000, "capEx");
			repX(7500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function TFSGenerous() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You donate funds to the Sisters with your compliments, ensuring that neither matron controls the contributed funds. They understand, and spread <span class="reputation inc">word of your generosity,</span> deflecting inquiries into their secretive world by praising you instead.`);
			cashX(-10000, "capEx");
			repX(5000, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function TFSBoth() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You reconnect the call you had with the first matron, splitting your desktop's display to accommodate both video call windows so that you can address both at once. Then you begin to suggest a compromise that should gratify both parties:`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`With their not so feminine voices, conspicuous Adam's apples, dry and barren artificial pussies, and naturally masculine hormonal balances, it is more or less an open secret that Futanari 'Sisters' are all biologically, well, men. It is considered poor taste to mention such a thing among polite company, however, as some men who own futas willfully try to ignore this fact or are otherwise are upset to be reminded of it. Your proposed remedy allows both sisters to have their way: With your extensive funding, those current Sisters who were biologically born male (all of them) will be endowed with bigger balls at the second matron's behest. Meanwhile, a new lineup of biologically female Futanari Sisters will be very rapidly inducted, transformed, cultured, trained, and readied for resale, under the expert leadership of the first matron. These new lady-futas will only have erect dicks to complement their natural fertile pussies, feminine hormones, and soft voices; nary a testicle in sight. Slaveowning society on the other hand will enjoy a wider variety of futanari slaves to choose from, opening up exciting new opportunities for owner to sate their personal preferences and perfect their harems. In 15 weeks, the absolute minimum time that all can be feasibly accomplished, everybody wins. Business will continue as usual in the Futanari Sisters until then, with no immediate change in merchandise.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`"Well, you aren't the first one to think of that." the first matron reluctantly states. "You see, there's this outcast group of Sisters who would be perfect for this, it's just... We haven't seen eye to eye for a long time." The second chimes in: "You could talk her into it, she approves of your build far more than mine. Will probably take several months though, to move them all over and integrate all the new Sisters into our fold, and to enjoy the new pussies, of course." After a moment of consideration, the first agrees. You donate the funds to the Sisters with your compliments, ensuring that neither matron completely controls the vast sum. They both understand what they have to do now, starting immediately.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Days later, the grateful institution begins a mass marketing campaign all across the world's Free Cities, which includes adverts in FCNN, FCTV, and FC social media about the upcoming changes to their Sister inventory and their need for willing new blood and new specialists to help them bolster their ranks. You feature prominently in each and every promotional item as their foremost contributor. Thanks to this <span class="reputation inc">you will be a household name in the Free Cities for some time.</span> Such a public flex of your financial muscles has also made your relative power very clear to some in the New World, attracting important players who <span class="green">will start to show an interest</span> in doing business with you and your Free City.`);
			V.TFS.schoolUpgrade = 3;
			cashX(-250000, "capEx");
			repX(10000, "event");
			V.arcologies[0].prosperity += 1;
			V.TFS.compromiseWeek = V.week;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
