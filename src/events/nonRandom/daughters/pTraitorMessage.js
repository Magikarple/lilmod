App.Events.PTraitorMessage = class PTraitorMessage extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.traitor !== 0
		];
	}

	execute(node) {
		let r = [];
		const {
			He,
			he, him
		} = getPronouns(V.traitor ? V.traitor : {pronoun: App.Data.Pronouns.Kind.neutral});

		V.nextButton = "Continue";
		const weeks = V.traitorWeeks-1;
		const pregWeeks = V.traitorWeeks-1;
		V.traitorWeeks = 1;
		if (V.traitor === 0) { // never happens, just for typing
			return node;
		}

		/* ------------------ pregnancy setup start here----------------- */
		const wasPreg = (V.traitor.preg > 0) ? 1 : 0;

		WombProgress(V.traitor, pregWeeks, pregWeeks); /* In all cases should be done */
		WombUpdatePregVars(V.traitor);
		if (V.traitor.broodmother > 0) { /* Broodmother implant is assumed as removed.*/
			V.traitor.preg = -1;
			V.traitor.counter.birthsTotal += WombBirthReady(V.traitor, 37);
			V.traitor.broodmother = 0;
			V.traitor.broodmotherFetuses = 0;
			WombFlush(V.traitor);
		} else if (WombBirthReady(V.traitor, V.traitor.pregData.normalBirth) > 0 ) { /* normal birth case, partial birthers not supported*/
			V.traitor.preg = -1;
			V.traitor.counter.birthsTotal += WombBirthReady(V.traitor, V.traitor.pregData.normalBirth);
			WombFlush(V.traitor);
		} else { /* still pregnant slave */
			V.traitor.preg = WombMaxPreg(V.traitor); /* most ready fetus is a base*/
			V.traitor.pregWeek = WombMaxPreg(V.traitor); /* most ready fetus is a base*/
		}
		SetBellySize(V.traitor); /* In any case it's useful to do.*/

		const isPreg = (V.traitor.preg > 0) ? 1 : 0;

		/* ------------------ pregnancy setup end here-----------------
			r.push(`As no broodmother cases in code below, it's no need to setup every case of impregnation through new system. Backup mechanic will do it for normal pregnancies.`);
		*/

		if (V.traitor.hStyle === "shaved") {
			V.traitor.hStyle = "strip";
		}
		if (V.traitor.bald !== 1) {
			if (V.traitor.hLength < 150) {
				V.traitor.hLength += weeks;
			}
		}
		ageSlaveWeeks(V.traitor, weeks);

		r.push(`The month after freeing ${V.traitor.slaveName}, you receive another message from the Daughters of Liberty. This one contains a video. It shows ${V.traitor.slaveName} sitting quietly at a table${(wasPreg !== isPreg) ? ", no longer clearly pregnant" : ""}, wearing comfortable clothes and eating a nice meal.`);
		if (V.traitorType === "agent") {
			if (V.traitor.intelligence+V.traitor.intelligenceImplant < -50) {
				r.push(`${He} looks a little bewildered, but there's an obvious happiness to ${him}; ${he} may be falling in with their teachings. ${He} seems unaware ${he}'s being recorded.`);
			} else if (wasPreg !== isPreg) {
				r.push(`${He} looks a little depressed, likely due to giving birth away from home, but ${he} is still playing the part of a traitor impeccably. ${He} seems aware ${he}'s being recorded and, for the briefest moment, makes eye contact with the camera.`);
			} else {
				r.push(`${He}'s playing the part of a traitor impeccably, feigning happiness despite yearning to be at your side. ${He} seems aware ${he}'s being recorded and, for the briefest moment, makes eye contact with the camera.`);
			}
		} else if (V.traitorType === "defiant") {
			r.push(`${He} looks elated to be free, it's impossible to deny. ${He} seems unaware ${he}'s being recorded.`);
		} else {
			r.push(`${He} looks a little bewildered, but there's an obvious happiness to ${him}, it's impossible to deny. ${He} seems unaware ${he}'s being recorded.`);
		}

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`A voice cuts in, calm but filled with unmistakable rage: "I hope you don't think this fixes everything, scum. We're still coming for you, and for all your slaveowning friends. All you've bought with this is the chance to maybe come out alive at the end. We'll be in touch."`);
		App.Events.addParagraph(node, r);
	}
};
