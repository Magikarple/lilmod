App.Intro.economyIntro = function() {
	const node = new DocumentFragment();

	App.Events.addParagraph(node, [
		`It is the year 2037, and the past 21 years have not been kind. The world is starting to fall apart. The climate is deteriorating, resources are being exhausted, and there are more people to feed every year. Technology is advancing, but not fast enough to save everyone. <span class="intro question"></span>`,
	]);

	if (V.PC.career === "arcology owner" || V.saveImported === 1) {
		setTimeout(() => Engine.play("Takeover Target"), Engine.minDomActionDelay);
	}

	const options = new App.UI.OptionsGroup();

	const difficultyComment = new Map([
		[1, `Not truly dire. Not yet.`],
		[2, `Getting a touch dire.`],
		[3, `Very serious.`],
		[4, `It won't be pretty.`],
		[5, `This is the last dance.`],
	]);

	options.addOption(`Exactly how bad is the situation?`, "baseDifficulty")
		.addValue(`Very Easy`, 1).addCallback(() => V.economy = 200)
		.addValue(`Easy`, 2).addCallback(() => V.economy = 125)
		.addValue(`Very serious (default)`, 3).addCallback(() => V.economy = 100)
		.addValue(`Hard`, 4).addCallback(() => V.economy = 80)
		.addValue(`Very Hard`, 5).addCallback(() => V.economy = 67)
		.addComment(difficultyComment.get(V.baseDifficulty));

	const difficultyComment2 = new Map([
		[0, `Barely noticeable, for now.`],
		[1, `A slow decline.`],
		[2, `It's visibly deteriorating before your eyes.`],
		[4, `It's going to hell in a handbasket.`],
	]);

	if (V.difficultySwitch === 0) {
		options.addOption(`How fast is it crumbling?`, "difficultySwitch")
			.addValue(`Vanilla`, 0)
			.addValue(`Harder`, 1).addCallback(()=>{ V.econRate = 2; })
			.addComment(`Some economic content requires this to be set to harder than vanilla`);
	} else {
		options.addOption(`How fast is it crumbling?`, "econRate")
			.addValue(`Return to vanilla`, 0).addCallback(() => {
				V.difficultySwitch = 0;
			})
			.addValue(`Easy`, 1)
			.addValue(`Medium`, 2)
			.addValue(`Hard`, 4)
			.addComment(difficultyComment2.get(V.econRate));
	}
	node.append(options.render());

	/* Not functional yet, place V.incomeRate = 1 in storyInit when ready for use
	//<div>
		r.push(`All the things you need to run your arcology are getting more expensive`);
		if (V.incomeMod === 0) {
			r.push(`while all forms of income`);
			//<span style="font-weight:Bold">remain static.</span> [[Easier|Economy Intro][V.incomeRate = 1]]
		} else if (V.incomeMod === 1) {
			r.push(`while all forms of income <span style="font-weight:Bold">rise but cannot keep pace.</span> [[Easier|Economy Intro][${V.incomeRate} = 2]] | [[Harder|Economy Intro][V.incomeRate = 0]]`);
		} else {
			r.push(`but luckily all forms of income <span style="font-weight:Bold">rise in lockstep.</span> [[Harder|Economy Intro][${V.incomeRate} = 1]]`);
		}
	//</div>

	//<div>
		[[Play with static economy|Economy Intro][V.difficultySwitch = 0]]
	//</div>
	*/
	// </p>
	// <p>

	App.Events.addResponses(node, [
		new App.Events.Result(`Next`, next),
		new App.Events.Result(`Skip Intro`, skip, `This will preclude you from taking over an established arcology.`),
	]);

	return node;

	function next() {
		Engine.play("Trade Intro");
		return ``;
	}
	function skip() {
		Engine.play("Intro Summary");
		return ``;
	}
};
