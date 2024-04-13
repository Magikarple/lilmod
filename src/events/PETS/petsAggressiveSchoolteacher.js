App.Events.petsAggressiveSchoolteacher = class petsAggressiveSchoolteacher extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Schoolteacher,
			() => S.Schoolteacher.intelligence + S.Schoolteacher.intelligenceImplant > 15,
			() => S.Schoolteacher.actualAge >= 35
		];
	}

	actorPrerequisites() {
		return [[
			s => s.assignment === Job.CLASSES
		]];
	}

	execute(node) {
		const subSlave = getSlave(this.actors[0]);
		const {
			he, his, him
		} = getPronouns(S.Schoolteacher);
		const {
			He2,
			he2, his2, him2
		} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [S.Schoolteacher, subSlave]);

		App.Events.addParagraph(node, [
			`${subSlave.slaveName} is at the head of the class. In this case, the literal head of the class; ${he2} has been performing poorly at ${his2} studies, so`,
			App.UI.DOM.slaveDescriptionDialog(S.Schoolteacher),
			`has ${him2} under the teacher's desk, giving ${S.Schoolteacher.slaveName} oral. ${S.Schoolteacher.slaveName} is continuing the lesson, giving little indication ${he}'s being orally serviced. The other students are doing their best to look attentive, lest they be required to replace ${subSlave.slaveName} under the teacher's desk.`
		]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Encourage the schoolteacher to abuse poor students`, encourage),
			new App.Events.Result(`Take the delinquent student in hand`, personal)
		]);

		function encourage() {
			App.Entity.facilities.schoolroom.employees().forEach(function(s) {
				if (s.intelligenceImplant < 30) {
					s.intelligenceImplant = Math.min(s.intelligenceImplant + 1, 30);
					seX(s, "oral", S.Schoolteacher, S.Schoolteacher.dick > 0 ? "penetrative" : "vaginal");
				}
			});
			return `You lean against the doorway of the classroom. ${S.Schoolteacher.slaveName} glances at you, but you subtly let ${him} know to continue with ${his} business. When ${he} finishes the lesson and, around the same time, climaxes, you clear your throat. The students all start with surprise and turn to you with trepidation. You observe in a conversational tone of voice that ${S.Schoolteacher.slaveName} is making great sacrifices here, performing a boring, unsexy job, and that any slave that does not work hard to learn will find themselves at the teacher's sexual disposal. Several of the least attentive students <span class="green">try to look studious,</span> though a few of the better ones can't hide a certain anticipation.`;
		}

		function personal() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`When ${S.Schoolteacher.slaveName} finishes using ${subSlave.slaveName}'s mouth, ${subSlave.slaveName} crawls out from under ${his2} desk and stumbles back towards ${his2} seat. ${He2} stops short when ${he2} realizes you're sitting in it. All the other students do their absolute best to be perfectly studious as ${subSlave.slaveName} gets back`);
			if (hasBothLegs(subSlave)) {
				r.push(`to ${his2} knees,`);
			} else {
				r.push(`in position,`);
			}
			r.push(`for you this time. After class is over, you tell ${him2} that since ${he2} can't have been paying particularly good attention, ${he2}'ll have to take <span class="green">remedial classes</span> after everyone else is done. ${S.Schoolteacher.slaveName} gives ${subSlave.slaveName} a very thorough grope at 'remedial classes,' making sure to pinch ${his} student's nipples.`);
			seX(subSlave, "oral", S.Schoolteacher, "penetrative");
			if (subSlave.intelligenceImplant < 30) {
				subSlave.intelligenceImplant = Math.min(subSlave.intelligenceImplant + 5, 30);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
