App.Markets["low tier criminals"] = function() {
	const el = new DocumentFragment();
	let r = [];
	// mixed prisoners
	r.push(`You board the transport to a small prison on the edge of the city spanning from the foot of your arcology with the appearance of an old world police station. You arrive inside and are met by a cute receptionist, asking why one such as yourself would visit such a place. With formalities out of the way, the head of the station is called and arrives shortly. "Well now, didn't expect to see you here. Came to pick up a criminal and give them a chance at not being a menial?" You are then led further into the station and into the prisoners' quarters; most of them appear downcast and dismal, but some look up to see what the commotion is about. "You! Come here! This fine`);
	r.push(`${V.PC.title === 1 ? 'gentleman' : 'lady'}`);
	r.push(`wants to take a look, so be on your best behavior!" the station's head calls out, bringing one of the criminals close enough to be inspected.`);
	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("low tier criminals", {sTitleSingular: "prisoner", sTitlePlural: "prisoners"}));
	return el;
};

App.Markets["gangs and smugglers"] = function() {
	const el = new DocumentFragment();
	let r = [];
	/* males only, or females only if ${V.seeDicks} === 0 */
	App.UI.DOM.appendNewElement("p", el, `You board the transport to a large gray prison at the edge of the Free City as word of your approach is sent ahead. The visage of the prison itself is a grim one, enclosed by a large gray concrete fence with electrified barbed wire coiled at the top. As the vehicle rolls to a stop before a large gate, the guard in control of the gate operates a board of buttons and levers, promptly opening it so it may continue. "Stay on the road," he respectfully advises, a final remark before letting your driver carry on. Beyond the fence is an array of guard towers manned with drones for 24/7 surveillance, giving you a clear idea of what was to happen if you were not to heed the guard's words and decided to wander off from the group.`);
	App.UI.DOM.appendNewElement("p", el, `Your destination at the end of the road is a garage, where upon your disembarking, no less than 4 heavily armored guards with electric batons at their sides come to greet you. You could almost mistake them for unmanned drones had they not started speaking. "We've been expecting you; please follow us. We house some dangerous individuals in our establishment and we need to keep you safe." You accept their advice and enter the premises.`);

	r.push(`You are met with a dimly lit concrete hallway as you enter, only for it to open up to a multi-floor prison that had placed its prisoners underground for the most`);
	if ((V.PC.title === 0 || V.PC.boobs >= 1000 || V.PC.butt >= 3) && V.seeDicks > 0) {
		r.push(`part, where you are met with a hailstorm of whistles, cheers and other catcalls.`);
	} else {
		r.push(`part.`);
	}
	r.push(`You come to a bridge and look down to see its inhabitants, hard criminals that are coming together for a meal. At one point, you watch a fight break out; an armored guard quickly steps in and applies his baton to the offenders, coupled with a loud zap that silences the entire area. Around your level, you see the better stock: the attractive prisoners one would show to an interested customer.`);
	App.UI.DOM.appendNewElement("p", el, r.join(" "));
	r = [];
	r.push(`You finally reach the warden's office. "Welcome,`);
	r.push(`${V.PC.title === 1 ? 'Mister' : 'Miss'}`);
	r.push(`${V.PC.slaveSurname}. I never thought my prison could have turned to a trade such as this, but times are hard." He beckons you to the seat opposite him. "But I'm not one to complain when opportunities come my way." He motions to his guards to bring in a select stock for your perusal. "We house some tough nuts in this establishment, but if you believe you can capitalize on these criminals, we'll be happy to have you take them off our hands." The guard returns with a convict ready to be sold.`);

	el.append(r.join(" "));
	el.append(App.Markets.purchaseFramework("gangs and smugglers", {sTitleSingular: "prisoner", sTitlePlural: "prisoners"}));
	return el;
};

App.Markets["white collar"] = function() {
	const el = new DocumentFragment();
	// mixed prisoners
	App.UI.DOM.appendNewElement("p", el, `You board the transport to what looks more like an oversized vacation home rather than something one goes to for committing crimes. You enter the premises into a small chamber with a booth to the side and are immediately met with a cheerful greeting. "Ah! We've been waiting for you. Please go in. We'll call someone to guide you immediately."`);
	App.UI.DOM.appendNewElement("p", el, `You nod at the prompt and enter further into the luxurious building to find a formally dressed guide and what appears to be the holding area of the prison. The cells, if you can call them that, are large and cozy, each with their own computer and television. The air is also conditioned for their comfort and old world classical music is playing to provide further ambiance. Walking through, you see the prisoners themselves, lazing about in their beds, sitting at their computers, or just talking to each other. If there was ever a prison you'd rather end up in, this would be it.`);
	App.UI.DOM.appendNewElement("p", el, `You enter the warden's office and are greeted with all due formalities. "Glad to see you at our establishment. When I heard that someone as renowned as yourself was coming over, I made the appropriate preparations." You are served a cup of tea as she brings in the chosen stock for you to observe at your leisure.`);

	el.append(App.Markets.purchaseFramework("white collar", {sTitleSingular: "prisoner", sTitlePlural: "prisoners"}));
	return el;
};

App.Markets["military prison"] = function() {
	const el = new DocumentFragment();
	let r = [];
	r.push(`You board the transport to a holding facility for prisoners of war located on the outskirts of the Free City, which is reasonable due to the dangers inherent to the criminals imprisoned in such an establishment. The driver radios ahead that you and several other interested parties will be arriving shortly. Once you disembark at the edge of the grounds, you are recognized by the stationed guard and ushered into a heavily armored vehicle.`);
	if (V.PC.career === "mercenary" || V.PC.career === "recruit") {
		r.push(`The interior brings back memories and you completely`);
	} else {
		r.push(`Although the interior makes you feel like a prisoner, you`);
	}
	r.push(`understand the reasoning behind such a design choice.`);
	App.UI.DOM.appendNewElement("p", el, r.join(" "));
	App.UI.DOM.appendNewElement("p", el, `Once you arrive at the prison, the door opens to a garage and another door, brightly lit to welcome you to the premises. Through the door, you find the prisoner's quarters, each of them enclosed by electrified fences to ensure your safety as you see the stock. A guard enters, asking you to follow him as he leads you across the chamber to meet with the warden.`);
	App.UI.DOM.appendNewElement("p", el, `Entering the warden's quarters, you take a seat across from him as he takes the initiative. "Ah, fancy meeting one such as yourself here. Though we house some of the hardiest criminals you can find, I'm sure someone of your capabilities could find great use for them." He smirks. "... or perhaps great entertainment through the pits," he says as he beckons to his staff as they bring in the selected stock.`);

	el.append(App.Markets.purchaseFramework("military prison", {sTitleSingular: "prisoner", sTitlePlural: "prisoners"}));
	return el;
};

App.Markets["juvenile detention"] = function() {
	const r = new SpacedTextAccumulator();
	// mixed prisoners
	r.push(`You board the transport to a small brick-clad juvenile detention facility on the outskirts of the Free City. You might have confused the building for a high school, if not for the double fence topped with razor wire. Although the owners of this facility once viewed it as a rehabilitation center, a lack of funding and serious overcrowding have made them open to seeing slavery as a path to that goal.`);
	if (V.PC.career === "hoodlum" || V.PC.career === "street urchin" || V.PC.career === "child prostitute") {
		r.push(`You brace yourself inwardly; some of your friends from the streets ended up in places like this, and you easily could have too, if your fortunes hadn't turned.`);
	}
	r.toParagraph();
	r.push(`You walk into the lobby of the facility and are greeted by a stern-looking heavyset woman in a warden's uniform. "Always happy to have you visit, `);
	r.push(`${V.PC.title === 1 ? 'Mister' : 'Miss'}`);
	r.push(`${V.PC.slaveSurname}. Your patronage is appreciated. I've arranged for a few of our detainees that need some extra discipline to be present in the courtyard, right this way."`);
	r.toParagraph();
	r.push(`Entering the courtyard, you see lines painted on the asphalt for athletic activity, faded through time and wear. A pair of tired basketball hoops and patched soccer goals frame the scene, while a cluster of teens${V.minimumSlaveAge < 13 ? " and preteens" : ""} mills around in one corner. A short blast from a guard's whistle brings them to attention and the warden begins calling them forward, one at a time, and ordering them to strip for inspection.`);
	r.toParagraph();

	const el = r.container();
	el.append(App.Markets.purchaseFramework("juvenile detention", {sTitleSingular: "detainee", sTitlePlural: "detainees"}));
	return el;
};
