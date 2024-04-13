// cSpell:ignore gaspy, oppurrtunities

App.Events.CMRESSCatWorship = class CMRESSCatWorship extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => FutureSocieties.isActive('FSEgyptianRevivalist')
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish === "dom",
				canStand,
				s => s.devotion > 20,
				s => s.race === "catgirl",
				s => App.Utils.hasFamilySex(s) || s.rules.release.slaves === 1
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, girl, himself
		} = getPronouns(eventSlave);
		const {
			heU, hisU, himU, himselfU
		} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push(`For a dominant cat${girl} like ${eventSlave.slaveName}, your arcology is a virtual paradise. The similarity of ${his} feline body to the ancient Egyptian Goddesses ensures a steady stream of devout worshippers to pay their respects to every part of ${eventSlave.slaveName}'s body. To ${his} dominance-focused mind, this mostly means a steady stream of human toys.`);
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`Today, while walking through your penthouse, a series of high moans from the showers prompt you to step in and see what's going on. It looks like ${eventSlave.slaveName} has managed to get two of your other slaves kneeling down on either side of ${him}, one of them giving ${him} some intense oral while the other rims ${him} from behind, ${his} tail flicked high up in the air as the shower's water runs down over the little orgy. ${He}'s quivering a little from the force of the two worshipful tongues toying with all ${his} sensitive bits, but the cat${girl} still manages to give you a nice little smile as you come across the hedonistic scene.`);
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Make all three worship under you instead`, groupworship),
			new App.Events.Result(`Spitroast one of the bottom slaves with ${eventSlave.slaveName}`, spitroast),
			new App.Events.Result(`Let ${him} enjoy ${himself}`, haveFun),
		]);

		function groupworship() {
			t = [];
			t.push(`You clear your throat, which causes the two slaves worshipping at ${eventSlave.slaveName}'s body to break away from their 'duties' and turn to face you in apparent surprise. Since ${eventSlave.slaveName} isn't the most dominant player in the showers anymore, all it takes is a single sharp order to bring all three of them, ${eventSlave.slaveName} included, on their knees in front of you, already working off your pants. Whatever minor annoyance ${eventSlave.slaveName} might have had about ${his} little worship session being interrupted is just about immediately quelled at the sight of your ${PC.dick !== 0 ? "cock" : "cunt"} the instant your underwear's pulled down, and you don't even have to say another word for the trifecta of slaves to get to work. As the other two kiss at your thighs, you pull ${eventSlave.slaveName}'s head up to the ${PC.dick !== 0 ? "head of your cock" : "flat of your cunt"} and tell ${him} that you've got something more fitting to worship at. ${eventSlave.slaveName} makes some fluttery <span class="devotion inc">doe eyes</span> at you as ${he} gets to work servicing ${his} owner, the two slaves to either side lapping at every inch ${he} doesn't hog greedily for ${himself}.`);
			eventSlave.devotion += 2;
			return t;
		}

		function spitroast() {
			t = [];
			t.push(`You enter into the showers yourself, accompanied by the sound of ${eventSlave.slaveName}'s mewling moans and the gentle patter of water on skin and fur. Slipping off your pants and ${PC.dick !== 0 ? "gripping your dick with one hand" : "readying the strapon you bring with you for just these sorts of oppurrtunities"}, the slave servicing ${eventSlave.slaveName}'s `);
			if (eventSlave.dick > 0) {
				t.push(`throbbing cock`);
			} else if (eventSlave.vagina > 0) {
				t.push(`drooling cunt`);
			} else {
				t.push(`smooth crotchfur`);
			}
			t.push(`yelps in surprise as you lift ${himU} up from the back, but doesn't resist as you angle and thrust ${PC.dick !== 0 ? "yourself" : "your strapon"} into ${himU}. The hard bucking immediately makes ${hisU} service to ${eventSlave.slaveName}'s crotch uneven and shaky - but the sporadic lapping from your thrusts, combined with the second slave still worshipping ${his} ass, just makes ${eventSlave.slaveName} even more of a gaspy mess. ${He} flutters ${his} big catlike eyes at you <span class="devotion inc">lovingly,</span> and leans forward to plant a <span class="trust inc">tender kiss</span> on your lips as you thrust forward into the bottom slave, before sputtering out the hardest orgasm you've ever seen with a tongue deep up ${his} ass, your lips locked together, and `);
			if (eventSlave.dick > 0) {
				t.push(`a pair of lips sealed around ${his} dick.`);
			} else if (eventSlave.vagina > 0) {
				t.push(`a second tongue up ${his} cunt.`);
			} else {
				t.push(`a soft tongue lapping at ${his} crotch.`);
			}
			eventSlave.devotion += 4;
			eventSlave.trust += 4;
			return t;
		}

		function haveFun() {
			t = [];
			t.push(`No reason to interrupt a good thing. You content yourself to lean back against the entrance to the showers and watch as ${eventSlave.slaveName} gets ${his} two little slaves to pay their respects to the feline form, the one in front `);
			if (eventSlave.dick > 0) {
				t.push(`throating ${himselfU} on cock`);
			} else if (eventSlave.vagina > 0) {
				t.push(`eating ${him} out with furry thighs locked against ${his} head`);
			} else {
				t.push(`lapping religiously at the smooth crotchfur`);
			}
			t.push(`while the one behind buries ${himselfU} deep in feline asscheeks, looking like ${heU}'s trying to get ${hisU} tongue deep enough up ${eventSlave.slaveName}'s butt to French kiss the feline from behind. ${eventSlave.slaveName} skillfully manages both of ${his} worshippers with ${his} hands, running them through both slave's hair and bucking ${his} ass and crotch reactively against each of their faces. Maintaining an impressive composure against the onslaught of sensation, ${eventSlave.slaveName} gives you a quivering little smile as you look onto the depraved scene, clearly <span class="trust inc">happy</span> you've let ${him} engage in ${his} dominant tendencies uninterrupted.`);
			eventSlave.trust += 10;
			return t;
		}
	}
};
