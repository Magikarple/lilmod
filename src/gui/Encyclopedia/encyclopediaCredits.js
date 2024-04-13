App.Encyclopedia.addArticle("Credits", function() {
	const r = new SpacedTextAccumulator();

	r.push("This game was created by a person with no coding experience whatsoever. If I can create a playable h-game, so can you.");
	r.toParagraph();
	r.push("<span class='encyclopedia emphasize'>I do not give credit without explicit permission to do so.</span> If you have contributed content and are not credited, please reach out on gitgud so credit can be given where due.");
	r.toParagraph();

	const credits = [{
		n: "Boney M",
		d: ["of JoNT /hgg/ mod fame has been invaluable, combing tirelessly through the code to find and report my imbecilities.", "Coded an improvement to the relative recruitment system.", "Wrote and coded the Ancient Egyptian Revivalism acquisition event.", "Wrote and coded a prestige event for ex-abolitionists.", "Coded a training event for slaves who hate blowjobs.", "Wrote and coded several slave introduction options."]
	}, {
		n: "DrPill",
		d: ["has offered great feedback, playtested exhaustively, and more.", "Wrote a slave introduction option."]
	}, {
		n: "bob22smith2000",
		d: ["has made major contributions, not limited to close review of thousands of lines of code.", "Improved all facility and most assignment code for v0.5.11, an immense task."]
	}, {
		n: "Gerald Russell", d: ["went into the code to locate and fix bugs."]
	}, {
		n: "Ryllynyth", d: ["contributed many bugfixes and suggestions in convenient code format."]
	}, {
		n: "CornCobMan",
		d: ["contributed several major modpacks, which include clothing, hair and eye colors, a facility name and arcology name expansions, UI improvements, nicknames, names, balance, a huge rework of the Rules Assistant, and more. CornCobMan has indefatigably supported the RA updates."]
	}, {
		n: "Klementine", d: ["wrote the fertility goddess skin for the personal assistant."]
	}, {
		n: "Wahn", d: ["wrote numerous generic recruitment events."]
	}, {
		n: "PregModder",
		d: ["has modded extensively, including descriptive embellishments for pregnant slaves, various asset descriptions, Master Suite reporting, the Wardrobe, a pack of facility leader interactions, options for Personal Assistant appearances, birthing scenes, fake pregnancy accessories, many other preg mechanics, blind content, expanded chubby belly descriptions, several new surgeries, neon and metallic makeup, better descriptive support for different refreshments, work on choosesOwnJob, many bugfixes, an expansion to the hostage corruption event chain, slave specific player titles, gagging and several basic gags, extended family mode, oversized sex toys, buttplug attachment system, and other, likely forgotten, things. (And that's just the vanilla added stuff!)"]
	}, {
		n: "Lolimodder", d: ["your loli expertise will be missed."]
	}, {
		n: "pregmodfan",
		d: ["for tremendous amounts of work with compilers, decompilers, etc. Single-handedly kicked this mod into its new git home. Contributed lots of bugfixes as well as fixed the RA considerably. Revamped pregnancy tracking as well then further expanded it — and then expanding it more with superfetation. Also for ppmod, ramod, implmod, cfpmod and psmod (preg speed). Added a pregnancy adaptation upgrade to the incubator."]
	}, {
		n: "FCGudder",
		d: ["for advanced economy reports, image improvements, cleaning and fixing extended-extended family mode, extending building widgets, anaphrodisiacs, name cleaning, height overhauling, proper slave summary caching, new shelter slaves, some crazy ass shit with vector art, fixing seDeath, coding jQuery in ui support and likely one to two of these other anon credits."]
	}, {
		n: "family mod anon", d: ["for extending extended family mode."]
	}, {
		n: "anon",
		d: ["for lolimod content, new slave careers, new pubestyles, general improvements and considerable bugfixing, most notably that infernal", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), "bug.",
		]
	}, {
		n: "anon", d: ["added a pair of fairy PA appearances."]
	}, {
		n: "anon", d: ["for their clitoral surgery, SMRs, and hip changes."]
	}, {
		n: "DarkTalon25",
		d: ["for the Scots, Belarus, Dominicans, gilfwork, additional nicknames and a scalemail bikini."]
	}, {
		n: "anon", d: ["for FAbuse alterations, gang leader start, and scarring."]
	}, {
		n: "anon", d: ["for numerous pointed out typos."]
	}, {
		n: "anon", d: ["for grorious nihon starting rocation."]
	}, {
		n: "anon", d: ["for player getting fucked work."]
	}, {
		n: "anon", d: ["for additional bodyguard weapons."]
	}, {
		n: "anon", d: ["for HGExclusion and animal pregnancy work."]
	}, {
		n: "anon", d: ["for putting up with my JavaScript incompetence."]
	}, {
		n: "anon", d: ["for player family listing."]
	}, {
		n: "anon",
		d: ["for interchangeable prosthetics, advanced facial surgeries, custom nationality distribution and corporation assets overhaul."]
	}, {
		n: "anon", d: ["for filter by assignment."]
	}, {
		n: "anon", d: ["for filter by facility."]
	}, {
		n: "anon", d: ["for forcing dicks onto slavegirls."]
	}, {
		n: "anon", d: ["for forcing dicks into slavegirls and forced slave riding."]
	}, {
		n: "Unknown modder", d: ["who did betterRA mod for old 0.9.5.4 version of original FC."]
	}, {
		n: "brpregmodfan", d: ["for Brazilian start and slave gen."]
	}, {
		n: "fcanon", d: ["for various fixes, massive improvements to the RA and wrangling my inabilty to spll gud."]
	}, {
		n: "stuffedgameanon",
		d: ["for fixes, streamlining the starting girls family code, family trees, unbelievable improvements to the games functionality, the sanityChecker, a tag checker and above ALL else; Improving the game's speed by an obscene amount. I swear this guy is a wizard. Now overhauling the UI as well."]
	}, {
		n: "anon", d: ["for a prototype foot job scene."]
	}, {
		n: "Preglocke",
		d: ["for cleaning and expanding the foot job scene and various little content additions and corrections."]
	}, {
		n: "anon",
		d: ["for writing forced marriages, extra escape outcomes, new recruits and events, a story for FCTV and more player refreshment types."]
	}, {
		n: "anon", d: ["for global realism stave trade setting."]
	}, {
		n: "anon", d: ["for new recruit events."]
	}, {
		n: "anon", d: ["for expanding the cheat edit menu for slaves."]
	}, {
		n: "thaumx", d: ["for bigger player balls, cum production, self-impregnation and FCTV."]
	}, {
		n: "anon",
		d: ["for head pats. What's next? Handholding? Consensual sex in the missionary position for the sole purpose of reproduction?"]
	}, {
		n: "anon", d: ["for Physical Idealist's beauty standard."]
	}, {
		n: "anon", d: ["for Gender Radicalist's trap preference."]
	}, {
		n: "anon", d: ["for the slave mutiny event."]
	}, {
		n: "onithyr", d: ["for various little tweaks and additions."]
	}, {
		n: "anonNeo", d: ["for spellchecking."]
	}, {
		n: "kopareigns", d: ["for countless text and bug fixes. Also large swathes of code improvements."]
	}, {
		n: "Utopia", d: ["for dirty dealings gang leader focus and updates to it."]
	}, {
		n: "hexall90'' for height growth drugs, incubator organ farm support and detailing, the dispensary cleanup, the joint Eugenics bad end rework with ''SFanon (blank)",
		d: [", the Hippolyta Academy, and the Security Expansion Mod (SecEx)."]
	}, {
		n: "sensei", d: ["for coding in support for commas and an excellent family tree rework."]
	}, {
		n: "laziestman", d: ["for sexy spats."]
	}, {
		n: "SFanon (blank)'' for SF related work, passive player skill gain, fulfillment order, player into summary and options rewriting, general fixes, storyCaption overhauling, updating and re-organizing the in-game wiki in addition to the joint Eugenics bad end rework with ''hexall90",
		d: [". Cleaned up the sidebar, now maintaining and expanding SecEx. Added warfare/engineering personal attention targets. Likes tabs. Co-converted the Encyclopedia to JS."]
	}, {
		n: "anon", d: ["for extending FCGudder's economy reports to the other facilities."]
	}, {
		n: "MilkAnon", d: ["for his contributions to FCTV and the FC world in general."]
	}, {
		n: "valen102938", d: ["for dealing with vector art, both creating new art and utilizing unused art."]
	}, {
		n: "anon", d: ["for making slaves seed their own fields."]
	}, {
		n: "Ansopedi", d: ["for slave career skills."]
	}, {
		n: "Emuis", d: ["for various compiler tweaks"]
	}, {
		n: "anon", d: ["for continued tweaks to various economy formulas."]
	}, {
		n: "anon", d: ["for master slaving's multi slave training."]
	}, {
		n: "Faraen", d: ["for a full vector art variant."]
	}, {
		n: "anon", d: ["for more hair vectors for the external art."]
	}, {
		n: "Vas",
		d: ["for massive JS work and completely redoing the RA. Set up the 'make' compiler. Gave nulls some nicknames."]
	}, {
		n: "deepmurk",
		d: ["for a massive expansion in conjunction with Nox to the original embedded vector art. Also more hairs, clothes, shoes, clothes, descriptions and clothes. Overhauled skin colors too."]
	}, {
		n: "Channel8", d: ["for FCTV content (and likely giving the spellCheck an aneurysm)."]
	}, {
		n: "Channel13", d: ["for FCTV content."]
	}, {
		n: "kidkinster", d: ["for slave management ui stuff and induced NCS."]
	}, {
		n: "editoranon", d: ["for cleaning text and drafting up bodyswap reactions."]
	}, {
		n: "anon", d: ["for the wetware CPU market."]
	}, {
		n: "Autistic Boi", d: ["for Mediterranean market preset."]
	}, {
		n: "anon", d: ["for the PA subjugationist and supremacist FS appearances."]
	}, {
		n: "Editoranon and Milkanon?", d: ["for prison markets and the nursing handjob scene."]
	}, {
		n: "DCoded",
		d: ["for creating the favicon, nursery, and farmyard, as well as animal-related content. Created a food system as well as a loan system. Refactored tons of code and standardized the facility passages. Also added several new scenes and interactions, the reminder system, and created and fixed a number of bugs."]
	}, {
		n: "HiveBro", d: ["for giving hyperpregnant slaves some serious loving."]
	}, {
		n: "Quin2k", d: ["for overwriting save function and expired tweak via Vrelnir & co."]
	}, {
		n: "ezsh",
		d: ["for bugfixing and creating a tool to build twineJS and twineCSS for me. Set up a revised SC update process as well. Has contributed massive revisions to the game's structure. Keeps the RA in line."]
	}, {
		n: "Sonofrevvan", d: ["for making slaves beg and dance."]
	}, {
		n: "skriv", d: ["for fixes and endless code cleaning."]
	}, {
		n: "Arkerthan",
		d: ["for various additions including merging cybermod and vanilla prosthetics. Java sanity check. Limbs and reworked amputation. Eye rework. Has begun overhauling various systems including the building layout. Dick tower. Work on user themes. Custom hotkeys. Co-converted the Encyclopedia to JS."]
	}, {
		n: "MouseOfLight",
		d: ["for overhauling the corporation. V proxy, nuff said. Added better safeguards to the RA."]
	}, {
		n: "svornost",
		d: [": A great asset. Various fixes and tools, including FCHost. Gave players the ability to find that one slave they are looking for. The 'Scope' macro. Optimized porn so beautifully I can't even think. Has continued his reign of optimization. Got extended family mode so smooth it supplanted vanilla. Laid the groundwork for the new event layout system."]
	}, {
		n: "Trashman1138", d: ["for various tweaks and fixes."]
	}, {
		n: "maxd569", d: ["for adding .mp4 and .webm support to custom images."]
	}, {
		n: "Anu", d: ["for various fixes."]
	}, {
		n: "Cayleth", d: ["for various fixes and support."]
	}, {
		n: "Jones", d: ["for major overhauling of the economy/population/health systems."]
	}, {
		n: "PandemoniumPenguin", d: ["for giving players a choice in FS names."]
	}, {
		n: "torbjornhub", d: ["for adding pit rules to the RA."]
	}, {
		n: "CheatMode", d: ["for additional cheatmode options."]
	}, {
		n: "Transhumanist01",
		d: ["for the production of husk slaves via incubator. Contributed the uterine hypersensitivity genetic quirk."]
	}, {
		n: "Fake_Dev", d: ["for nipple enhancers."]
	}, {
		n: "UnwrappedGodiva", d: ["for a tool to edit save files."]
	}, {
		n: "git contributors lost to time", d: ["for their submissions and work through pregmod's git."]
	}, {
		n: "Bane70", d: ["optimized huge swaths of code with notable professionalism."]
	}, {
		n: "Circle Tritagonist", d: ["provided several new collars and outfits."]
	}, {
		n: "Qotsafan", d: ["submitted bugfixes."]
	}, {
		n: "FireDrops",
		d: ["provided standardized body mod scoring, gave Recruiters their idle functions, revised personal assistant future society associations, and fixed bugs."]
	}, {
		n: "Princess April", d: ["wrote and coded several random events and the Slimness Enthusiast Dairy upgrade."]
	}, {
		n: "Hicks", d: ["provided minor logic and balance improvements in coded, release-ready form."]
	}, {
		n: "Dej", d: ["coded better diet logic for the RA."]
	}, {
		n: "Flooby Badoop", d: ["wrote and coded a random recruitment event."]
	}, {
		n: "FC_BourbonDrinker", d: ["went into the code to locate and fix bugs."]
	}, {
		n: "Shokushu",
		d: ["created a rendered imagepack comprising 775 images, and assisted with the code necessary to display them. Also maybe the dinner party event?"]
	}, {
		n: "NovX", d: ["created a vector art system."]
	}, {
		n: "Mauve", d: ["contributed vector collars and pubic hair."]
	}, {
		n: "Rodziel", d: ["contributed the cybernetics mod."]
	}, {
		n: "prndev", d: ["wrote the Free Range Dairy Assignment scene. Also did tons of vector art work."]
	}, {
		n: "freecitiesbandit",
		d: ["wrote a number of recruitment, future society, mercenary and random events, provided tailed buttplugs, new eyes and tattoos, and contributed the code for the mercenary raiders policy."]
	}, {
		n: "DrNoOne", d: ["wrote the bulk slave purchase and persistent summary code."]
	}, {
		n: "Mauve", d: ["provided vector art for chastity belts and limp dicks."]
	}, {
		n: "Klorpa",
		d: ["for dozens of new nationalities and boundless new names and nicknames. Also monokinis, middle eastern clothing, overalls and aprons. Also the hearing, taste, and smell overhauls. Added basic support for watersports. Has declared war on bad spelling, grammar and formatting. Added eyebrows too. Dug up ancient abandoned vanilla vignettes and implemented them. Toiled in the depths to extend limb support."]
	}, {
		n: "lowercasedonkey",
		d: ["for various additions, not limited to the budget overhauls. Set up all the tabs too. Gave events dynamic vector art. Hammered the scarring and branding systems into place. Been a real boon writing events and other things as well. Used ezsh's facility framework to enhance slave summaries. Set up a system to recall where slaves were serving. Striving to master DOM with great gains. Co-converted the Encyclopedia to JS."]
	}, {
		n: "amomynous0", d: ["for bug reports and testing in addition to SFmod unit descriptions."]
	}, {
		n: "wepsrd", d: ["for QOL (hormonal balance cheat and lactation adaptation to new menu) fixes."]
	}, {
		n: "i107760",
		d: ["for Costs Budget, CashX work, The Utopian Orphanage, Farmyard, Special Forces work, various QoL additions and Private Tutoring System."]
	}];

	for (const credit of credits) {
		const div = document.createElement("div");
		App.UI.DOM.appendNewElement("span", div, credit.n, ["encyclopedia", "topic"]);
		for (const line of credit.d) {
			div.append(" ", line);
		}
		r.container().append(div);
	}

	r.push("<span class='encyclopedia topic'>Many other anonymous contributors</span> helped fix bugs via GitHub. They will be credited by name upon request.");
	r.toParagraph();

	r.push("Thanks are due to all the anons that submitted slaves for inclusion in the pre-owned database and offered content ideas. Many anonymous playtesters also gave crucial feedback and bug reports. May you all ride straight to the gates of Valhalla, shiny and chrome.");
	r.toParagraph();

	return r.container();
}, "credits");
