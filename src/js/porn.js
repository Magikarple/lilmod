// cSpell:ignore maiesiophiliacs

App.Porn.GenreType = {
	paraphilia: {
		focusedViewershipFactor: 1.5,
		unfocusedViewershipFactor: 0.5,
		viewershipSoakingFactor: 0.0,
		bonusViewership: function(slave) { return slave.fetishStrength * 2.0; },
		name: "paraphilia"
	},
	fetish: {
		focusedViewershipFactor: 2.0,
		unfocusedViewershipFactor: 0.5,
		viewershipSoakingFactor: 1.0,
		bonusViewership: function(slave) { return slave.fetishStrength; },
		name: "fetish"
	},
	general: {
		focusedViewershipFactor: 4.0,
		unfocusedViewershipFactor: 0.5,
		viewershipSoakingFactor: 1.0,
		bonusViewership: function(slave) { return 0.0; },
		name: "general"
	},
	quirk: {
		focusedViewershipFactor: 6.0,
		unfocusedViewershipFactor: 0.5,
		viewershipSoakingFactor: 1.0,
		bonusViewership: function(slave) { return 0.0; },
		name: "quirk"
	},
	generic: {
		focusedViewershipFactor: 5.0,
		unfocusedViewershipFactor: 1.0,
		viewershipSoakingFactor: 0.0,
		bonusViewership: function(slave) { return 0.0; },
		name: "generic"
	}
};

App.Porn.Genre = {};

/* Paraphilia genres */

App.Porn.Genre.neglectful = {
	fameVar: "neglectful",
	fameName: "orgasm denial",
	focusName: "neglectful",
	type: App.Porn.GenreType.paraphilia,
	prestigeDesc1: "Thousands have enjoyed the sight of $him ignoring $his own pleasure",
	prestigeDesc2: "$His many fans relish the sight of $him denying $himself pleasure",
	prestigeDesc3: "Millions are intimately familiar with the sight of $him denying $himself pleasure",
	hitText: function(slave) { return `${getPronouns(slave).His} lack of interest in getting off ${getPronouns(slave).himself}, even when at the verge of climax, makes ${getPronouns(slave).him} a hit with viewers that enjoy orgasm denial.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} pleasing a line of partners without cumming once`; },
	valid: function(slave) { return slave.sexualFlaw === "neglectful"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.cumAddict = {
	fameVar: "cumAddict",
	fameName: "cum addiction",
	focusName: "cum addict",
	type: App.Porn.GenreType.paraphilia,
	prestigeDesc1: "Thousands have enjoyed watching $him do anything and everything for cum",
	prestigeDesc2: "$His many fans relish the sight of $him doing anything for cum",
	prestigeDesc3: "Millions are intimately familiar with the sight of $him doing anything for cum",
	hitText: function(slave) { return `${getPronouns(slave).His} complete obsession with cum makes ${getPronouns(slave).him} a hit with viewers that enjoy bukkake and cum drinking.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} bathing in a tub of cum`; },
	valid: function(slave) { return slave.sexualFlaw === "cum addict"; },
	uiName: function() { return capFirstChar(this.fameName); }
};

App.Porn.Genre.analAddict = {
	fameVar: "analAddict",
	fameName: "anal addiction",
	focusName: "anal addict",
	type: App.Porn.GenreType.paraphilia,
	prestigeDesc1: "Thousands have enjoyed watching $him do anything for a dick in $his ass",
	prestigeDesc2: "$His many fans relish the sight of $him doing anything for a dick up $his ass",
	prestigeDesc3: "Millions are intimately familiar with the sight of $his well-versed anus",
	hitText: function(slave) { return `${getPronouns(slave).His} complete obsession with taking things up ${getPronouns(slave).his} ass makes ${getPronouns(slave).him} a hit with viewers that enjoy hardcore anal.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} taking a series of huge cocks up ${getPronouns(slave).his} ass`; },
	valid: function(slave) { return slave.sexualFlaw === "anal addict" && canDoAnal(slave); },
	uiName: function() { return capFirstChar(this.fameName); }
};

App.Porn.Genre.attentionWhore = {
	fameVar: "attentionWhore",
	fameName: "exhibition",
	focusName: "attention whore",
	type: App.Porn.GenreType.paraphilia,
	prestigeDesc1: "Thousands have enjoyed watching $him do anything for attention",
	prestigeDesc2: "$His many fans relish the sight of $him doing anything for attention",
	prestigeDesc3: "Millions are intimately familiar with the sight of $him doing anything for attention",
	hitText: function(slave) { return `${getPronouns(slave).His} complete obsession with being the center of attention makes ${getPronouns(slave).him} a hit with viewers that savor ${getPronouns(slave).his} frequent exhibitionism.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} flashing strangers`; },
	valid: function(slave) { return slave.sexualFlaw === "attention whore"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.breastGrowth = {
	fameVar: "breastGrowth",
	fameName: "breast expansion",
	focusName: "breast growth",
	type: App.Porn.GenreType.paraphilia,
	prestigeDesc1: "Thousands have enjoyed charting the growth of $his breasts",
	prestigeDesc2: "$His many fans relish the sight of $his expanding bust",
	prestigeDesc3: "Millions are intimately familiar with the history of $his growing bust",
	hitText: function(slave) { return `${getPronouns(slave).His} complete obsession with the ever-increasing size of ${getPronouns(slave).his} tits makes ${getPronouns(slave).him} a hit with viewers that enjoy enormous knockers and breast expansion.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} having ${getPronouns(slave).his} tits measured`; },
	valid: function(slave) { return slave.sexualFlaw === "breast growth"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.abusive = {
	fameVar: "abusive",
	fameName: "abuse",
	focusName: "abusive",
	type: App.Porn.GenreType.paraphilia,
	prestigeDesc1: "Thousands have enjoyed watching $him abuse others",
	prestigeDesc2: "$His many fans relish the sight of $him abusing others",
	prestigeDesc3: "Millions are intimately familiar with $his abusive tendencies",
	hitText: function(slave) { return `${getPronouns(slave).His} wanton enjoyment of pleasure through force amuses viewers that enjoy rape and abuse.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} taking what ${getPronouns(slave).he} wants by force`; },
	valid: function(slave) { return slave.sexualFlaw === "abusive"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.malicious = {
	fameVar: "malicious",
	fameName: "sexual torture",
	focusName: "malicious",
	type: App.Porn.GenreType.paraphilia,
	prestigeDesc1: "Thousands have enjoyed $him getting off from the suffering $he caused",
	prestigeDesc2: "$His many fans relish the sight of $him getting off from the suffering $he caused",
	prestigeDesc3: "Millions are intimately familiar with $his hunger for making others suffer",
	hitText: function(slave) { return `${getPronouns(slave).His} sexual appetite for others' suffering makes ${getPronouns(slave).him} a hit with viewers that enjoy sadism and violence.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} tormenting ${getPronouns(slave).his} prey`; },
	valid: function(slave) { return slave.sexualFlaw === "malicious"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.selfHating = {
	fameVar: "selfHating",
	fameName: "self hating",
	focusName: "self hating",
	type: App.Porn.GenreType.paraphilia,
	prestigeDesc1: "Thousands have enjoyed watching $him happily suffer",
	prestigeDesc2: "$His many fans relish $his suffering",
	prestigeDesc3: "Millions are intimately familiar with the sight of $him suffering",
	hitText: function(slave) { return `${getPronouns(slave).His} complete disregard for ${getPronouns(slave).his} own wellbeing makes ${getPronouns(slave).him} a hit with viewers that enjoy watching ${getPronouns(slave).him} suffer.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} orgasming from pain`; },
	valid: function(slave) { return slave.sexualFlaw === "self hating"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.breeder = {
	fameVar: "breeder",
	fameName: "breeder",
	focusName: "breeder",
	type: App.Porn.GenreType.paraphilia,
	prestigeDesc1: "Thousands have enjoyed watching $him obsess over pumping out babies",
	prestigeDesc2: "$His many fans relish $his obsession with having children",
	prestigeDesc3: "Millions are intimately familiar with $his obsession with being pregnant",
	hitText: function(slave) { return `${getPronouns(slave).His} complete obsession with getting and staying pregnant makes ${getPronouns(slave).him} a hit with viewers with all manner of pregnancy fetish, but particularly resonates with those as focused on it as ${getPronouns(slave).he} is.`; },
	trinketShotDesc: function(slave) {
		if (slave.counter.births > 0) {
			return `showing ${getPronouns(slave).him} having an orgasmic birth`;
		} else {
			return `showing ${getPronouns(slave).him} being bred`;
		}
	},
	valid: function(slave) { return slave.sexualFlaw === "breeder"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

/* Fetish genres */

App.Porn.Genre.sub = {
	fameVar: "sub",
	fameName: "submissive",
	focusName: "submissive",
	type: App.Porn.GenreType.fetish,
	prestigeDesc1: "Thousands have enjoyed $his submission",
	prestigeDesc2: "$His many fans relish $his submissiveness",
	prestigeDesc3: "Millions are intimately familiar with $his submissiveness",
	hitText: function(slave) { return `With ${getPronouns(slave).his} submissive streak, ${getPronouns(slave).he} has a clear advantage when it comes to fetish smut.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).his} submission`; },
	valid: function(slave) { return slave.fetish === Fetish.SUBMISSIVE; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.cumSlut = {
	fameVar: "cumSlut",
	fameName: "cum",
	focusName: "cumslut",
	type: App.Porn.GenreType.fetish,
	prestigeDesc1: "Thousands have enjoyed $his taste for cum",
	prestigeDesc2: "$His many fans relish $his desire for cum",
	prestigeDesc3: "Millions are intimately familiar with $his taste for cum",
	hitText: function(slave) { return `With ${getPronouns(slave).his} taste for cum, ${getPronouns(slave).he} has a clear advantage when it comes to ejaculate-based smut.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} drinking a glass of cum`; },
	valid: function(slave) { return slave.fetish === "cumslut"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.anal = {
	fameVar: "anal",
	fameName: "buttslut",
	focusName: "buttslut",
	type: App.Porn.GenreType.fetish,
	prestigeDesc1: "Thousands have enjoyed the sight of $his rear",
	prestigeDesc2: "$His many fans relish the sight of $his rear",
	prestigeDesc3: "Millions are intimately familiar with the sight of $his rear",
	hitText: function(slave) { return `With ${getPronouns(slave).his} fetish for asses, ${getPronouns(slave).he} finds friends in the company of viewers that love rear ends.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} shaking ${getPronouns(slave).his} booty`; },
	valid: function(slave) { return slave.fetish === "buttslut"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.humiliation = {
	fameVar: "humiliation",
	fameName: "humiliating",
	focusName: "humiliation",
	type: App.Porn.GenreType.fetish,
	prestigeDesc1: "Thousands have enjoyed $him humiliating $himself",
	prestigeDesc2: "$His many fans relish $his frequent humiliation",
	prestigeDesc3: "Millions are intimately familiar with $his frequent humiliation",
	hitText: function(slave) { return `With ${getPronouns(slave).his} fetish for humiliation, ${getPronouns(slave).he} has a clear advantage when it comes to demeaning smut.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} humiliated in public`; },
	valid: function(slave) { return slave.fetish === "humiliation"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.boobs = {
	fameVar: "boobs",
	fameName: "breast",
	focusName: "boobs",
	type: App.Porn.GenreType.fetish,
	prestigeDesc1: "Thousands have enjoyed the sight of $his breasts",
	prestigeDesc2: "$His many fans relish the sight of $his breasts",
	prestigeDesc3: "Millions are intimately familiar with $his breasts",
	hitText: function(slave) { return `With ${getPronouns(slave).his} fetish for tits, ${getPronouns(slave).he} has a clear advantage when it comes to breast-focused smut.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).his} bare chest`; },
	valid: function(slave) { return slave.fetish === "boobs"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.dom = {
	fameVar: "dom",
	fameName: "dominant",
	focusName: "dom",
	type: App.Porn.GenreType.fetish,
	prestigeDesc1: "Thousands have enjoyed $his dominance",
	prestigeDesc2: "$His many fans relish $his dominance",
	prestigeDesc3: "Millions are intimately familiar with $his dominant streak",
	hitText: function(slave) { return `With ${getPronouns(slave).his} dominant streak, ${getPronouns(slave).he} has a clear advantage when it comes to fetish smut.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} seated upon ${getPronouns(slave).his} obedient toy`; },
	valid: function(slave) { return slave.fetish === "dom"; },
	uiName: function() { return capFirstChar(this.fameName); }
};

App.Porn.Genre.sadist = {
	fameVar: "sadist",
	fameName: "sadistic",
	focusName: "sadist",
	type: App.Porn.GenreType.fetish,
	prestigeDesc1: "Thousands have enjoyed $his sadism",
	prestigeDesc2: "$His many fans relish $his sadism",
	prestigeDesc3: "Millions are intimately familiar with $his sadistic streak",
	hitText: function(slave) { return `With ${getPronouns(slave).his} sadistic streak, ${getPronouns(slave).he} has a clear advantage when it comes to fetish smut.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} whipping ${getPronouns(slave).his} lover`; },
	valid: function(slave) { return slave.fetish === "sadist"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.masochist = {
	fameVar: "masochist",
	fameName: "masochistic",
	focusName: "masochist",
	type: App.Porn.GenreType.fetish,
	prestigeDesc1: "Thousands have enjoyed $his masochism",
	prestigeDesc2: "$His many fans relish the sight of $his masochism",
	prestigeDesc3: "Millions are intimately familiar with $his masochistic streak",
	hitText: function(slave) { return `With ${getPronouns(slave).his} masochistic streak, ${getPronouns(slave).he} has a clear advantage when it comes to fetish smut.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} being whipped`; },
	valid: function(slave) { return slave.fetish === "masochist"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.pregnancy = {
	fameVar: "pregnancy",
	fameName: "pregnancy fetish",
	focusName: "pregnancy",
	type: App.Porn.GenreType.fetish,
	prestigeDesc1: "Thousands have enjoyed $his fondness for pregnancy",
	prestigeDesc2: "$His many fans relish the sight of $his fondness for pregnancy",
	prestigeDesc3: "Millions are intimately familiar with $his pregnancy kink",
	hitText: function(slave) { return `With ${getPronouns(slave).his} fetish for all things pregnancy, ${getPronouns(slave).he} has a clear advantage when it comes to fetish smut.`; },
	trinketShotDesc: function(slave) {
		if (slave.ovaries === 1 || slave.mpreg === 1) {
			return `showing ${getPronouns(slave).him} getting knocked up`;
		} else if (slave.dick > 0) {
			return `showing ${getPronouns(slave).him} knocking a girl up`;
		} else {
			return `showing ${getPronouns(slave).him} pretending to be pregnant`;
		}
	},
	valid: function(slave) { return slave.fetish === "pregnancy"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

/* General genres */

App.Porn.Genre.fuckdoll = {
	fameVar: "fuckdoll",
	fameName: "fuckdoll",
	focusName: "fuckdoll",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "$His fans relish the sight of $him being used",
	prestigeDesc2: "$His many fans relish the sight of $him being used",
	prestigeDesc3: "Millions are intimately familiar with the sight of $him being used",
	hitText: function(slave) { return `${getPronouns(slave).His} latex encased body attracts a variety of viewers with tastes ranging from bondage to dolls.`; },
	trinketShotDesc: function(slave) { return `showing it offering itself`; },
	valid: function(slave) { return slave.fuckdoll > 0; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.rape = {
	fameVar: "rape",
	fameName: "rape",
	focusName: "rape",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed the sight of $him being raped",
	prestigeDesc2: "$His many fans relish the sight of $him being raped",
	prestigeDesc3: "Millions are intimately familiar with the sight of $him being raped",
	hitText: function(slave) { return `${getPronouns(slave).He} is too unbroken for consensual sex, but ${getPronouns(slave).his} viewers wouldn't want it any other way.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).his} rape`; },
	valid: function(slave) { return (slave.devotion < -20) && (slave.counter.anal + slave.counter.vaginal > 0); },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.preggo = {
	fameVar: "preggo",
	fameName: "preggo",
	focusName: "preggo",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed watching $him swell with child",
	prestigeDesc2: "$His many fans relish the sight of $him swollen with child",
	prestigeDesc3: "Millions are intimately familiar with the sight of $him swollen with child",
	hitText: function(slave) { return `${getPronouns(slave).His} gravid swell may be a turn off to some, but the maiesiophiliacs love it.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} cradling ${getPronouns(slave).his} middle`; },
	valid: function(slave) { return slave.bellyPreg > 500; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.BBW = {
	fameVar: "BBW",
	fameName: "BBW",
	focusName: "BBW",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed the sight of $his thick and soft body",
	prestigeDesc2: "$His many fans relish the sight of $his thick, soft body",
	prestigeDesc3: "Millions are intimately familiar with $his thick, soft body",
	hitText: function(slave) { return `${getPronouns(slave).His} weight gives ${getPronouns(slave).him} a heavy allure to the chubby chasers and BBW lovers out there.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} giving a bellyjob`; },
	valid: function(slave) { return slave.weight > 95; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.loli = {
	fameVar: "loli",
	fameName: "underage",
	focusName: "loli",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed the sight of $his childish body",
	prestigeDesc2: "$His many fans relish $his immature body",
	prestigeDesc3: "Millions are intimately familiar with $his immature body",
	hitText: function(slave) { return `${getPronouns(slave).His} young age gives ${getPronouns(slave).him} a dangerous edge and a number of careful viewers.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).his} 'innocence'`; },
	valid: function(slave) { return slave.visualAge <= 12; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.gainer = {
	fameVar: "gainer",
	fameName: "weight gain",
	focusName: "gainer",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed the sight of $him eating and gaining weight",
	prestigeDesc2: "$His many fans relish how curvy $he's gotten",
	prestigeDesc3: "Millions are intimately familiar with how much weight $he has gained",
	hitText: function(slave) { return `${getPronouns(slave).His} expanding waistline attracts those who enjoy seeing a ${getPronouns(slave).girl} pack on the pounds while stuffing ${getPronouns(slave).his} face.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} trying on ${getPronouns(slave).his} old clothes`; },
	valid: function(slave) { return (slave.weight > 30 && slave.diet === "fattening") || (slave.inflation > 0 && slave.inflationType === "food"); },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.stud = {
	fameVar: "stud",
	fameName: "big dick",
	focusName: "stud",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed the sight of $his throbbing erection",
	prestigeDesc2: "$His many fans relish the sight of $his heavy dick",
	prestigeDesc3: "Millions are intimately familiar with the sight of $his erect dick",
	hitText: function(slave) { return `${getPronouns(slave).His} powerful erection excites those who see it, especially when it is put to good use.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).his} money shot`; },
	valid: function(slave) { return canPenetrate(slave) && slave.dick > 3; },
	uiName: function() { return capFirstChar(this.fameName); }
};

App.Porn.Genre.muscle = {
	fameVar: "muscle",
	fameName: "muscle",
	focusName: "muscle",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed the sight of $his hard muscles",
	prestigeDesc2: "$His many fans relish the sight of $his hard muscles",
	prestigeDesc3: "Millions are intimately familiar with the sight of $his hard muscles",
	hitText: function(slave) { return `${getPronouns(slave).His} powerful muscles and bodybuilder physique attracts a dedicated audience.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} holding ${getPronouns(slave).his} partner in the air during sex`; },
	valid: function(slave) { return slave.muscles > 80; },
	uiName: function() { return capFirstChar(this.fameName); }
};

App.Porn.Genre.incest = {
	fameVar: "incest",
	fameName: "taboo",
	focusName: "incest",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed seeing the love $he shares with $his family members",
	prestigeDesc2: "$His many fans relish the sight of $him loving $his family members",
	prestigeDesc3: "Millions are intimately familiar with the sight of $him loving $his family members",
	hitText: function(slave) {
		if (App.Utils.hasPartnerSex(slave) && areRelated(slave, getSlave(slave.relationshipTarget))) {
			const partner = getSlave(slave.relationshipTarget);
			return `${getPronouns(slave).His} sexual escapades with ${getPronouns(slave).his} ${relativeTerm(slave, partner)} ${partner.slaveName} excite viewers attracted to incestuous relationships.`;
		} else if (App.Utils.hasFamilySex(slave)) {
			return `${getPronouns(slave).His} sexual escapades with ${getPronouns(slave).his} close family members excite viewers attracted to incest.`;
		} else {
			return `${getPronouns(slave).His} sexual escapades with you, ${getPronouns(slave).his} own ${relativeTerm(slave, V.PC)}, excite viewers attracted to incestuous relationships.`;
		}
	},
	trinketShotDesc: function(slave) {
		if (App.Utils.hasPartnerSex(slave) && areRelated(slave, getSlave(slave.relationshipTarget))) {
			const partner = getSlave(slave.relationshipTarget);
			return `showing ${getPronouns(slave).him} having fun with ${getPronouns(slave).his} ${relativeTerm(slave, partner)} ${partner.slaveName}`;
		} else if (App.Utils.hasFamilySex(slave)) {
			return `showing ${getPronouns(slave).him} having incestuous fun with ${getPronouns(slave).his} family`;
		} else {
			return `showing ${getPronouns(slave).him} having incestuous fun with you`;
		}
	},
	valid: function(slave) {
		return (V.seeIncest !== 0) && (
			(App.Utils.hasFamilySex(slave)) || // has sex with family
			(App.Utils.hasPartnerSex(slave) && areRelated(slave, getSlave(slave.relationshipTarget))) || // or with her partner, who is related to her
			(App.Utils.sexAllowed(slave, V.PC) && areRelated(slave, V.PC)) // or with you, and is related to you
		);
	},
	uiName: function() { return capFirstChar(this.fameName); }
};

App.Porn.Genre.fucker = {
	fameVar: "fucker",
	fameName: "penetrative",
	focusName: "penetrative",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed witnessing $his mastery of drilling vaginas and rectums",
	prestigeDesc2: "$His many fans relish learning new techniques from watching $him masterfully penetrate holes",
	prestigeDesc3: "Millions are intimately familiar with $his masterful technique at pleasing others by pounding their pussy or butthole",
	hitText: function(slave) { return `${getPronouns(slave).He} hypnotizes ${getPronouns(slave).his} audience with the ${getPronouns(slave).he} flawless technique ${getPronouns(slave).he} uses when penetrating any bodily orifice.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} driving ${getPronouns(slave).his} partner crazy with the pleasure granted by ${getPronouns(slave).his} masterful cock.`; },
	valid: function(slave) { return canPenetrate(slave) && slave.dick > 2 && slave.skill.penetrative >= 100; },
	uiName: function() { return capFirstChar(this.fameName); }
};

App.Porn.Genre.clitFucker = {
	fameVar: "clitFucker",
	fameName: "clitoral penetrative",
	focusName: "dickclit",
	type: App.Porn.GenreType.general,
	prestigeDesc1: "Thousands have enjoyed watching $him drill vaginas and rectums with nothing but $his clit",
	prestigeDesc2: "$His many fans relish the sight of $him fucking holes with $his clit",
	prestigeDesc3: "Millions are intimately familiar with the sight of $his clit pounding holes and putting dicks to shame",
	hitText: function(slave) { return `${getPronouns(slave).He} amazes viewers with just how well a clitoris can be used in place of a dick.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).his} prominently erect clit.`; },
	valid: function(slave) { return slave.chastityVagina === 0 && slave.clit >= 3 && slave.skill.penetrative >= 60; },
	uiName: function() { return capFirstChar(this.fameName); }
};

/* quirk genres */

App.Porn.Genre.deepThroat = {
	fameVar: "deepThroat",
	fameName: "deepthroat",
	focusName: "gagfuck queen",
	type: App.Porn.GenreType.quirk,
	prestigeDesc1: "Thousands have enjoyed the sounds $he makes when being throatfucked",
	prestigeDesc2: "$His many fans relish the sounds $he makes when being throatfucked",
	prestigeDesc3: "Millions are intimately familiar with the sounds $he makes when being throatfucked",
	hitText: function(slave) { return `${getPronouns(slave).He} impresses with just how much dick can slip down ${getPronouns(slave).his} throat.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} getting facefucked`; },
	valid: function(slave) { return slave.sexualQuirk === "gagfuck queen"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.struggleFuck = {
	fameVar: "struggleFuck",
	fameName: "unwilling",
	focusName: "strugglefuck queen",
	type: App.Porn.GenreType.quirk,
	prestigeDesc1: "Thousands have enjoyed how $he struggles during sex",
	prestigeDesc2: "$His many fans relish how perfectly $he struggles during sex",
	prestigeDesc3: "Millions are intimately familiar with how perfectly $he struggles during sex",
	hitText: function(slave) { return `${getPronouns(slave).He} impresses with ${getPronouns(slave).his} ability to put up just the right amount of fight during sex.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} struggling`; },
	valid: function(slave) { return slave.sexualQuirk === "strugglefuck queen" && (canDoVaginal(slave) || canDoAnal(slave)); },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.painal = {
	fameVar: "painal",
	fameName: "hardcore anal",
	focusName: "painal queen",
	type: App.Porn.GenreType.quirk,
	prestigeDesc1: "Thousands have enjoyed watching $his asshole pushed to its limit",
	prestigeDesc2: "$His many fans relish watching $his asshole pushed to its limit",
	prestigeDesc3: "Millions are intimately familiar with seeing $his asshole pushed to its limit",
	hitText: function(slave) { return `${getPronouns(slave).He} impresses with ${getPronouns(slave).his} ability to push ${getPronouns(slave).his} anus to its limit.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} taking an enormous dick up ${getPronouns(slave).his} ass`; },
	valid: function(slave) { return slave.sexualQuirk === "painal queen" && canDoAnal(slave); },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.tease = {
	fameVar: "tease",
	fameName: "softcore",
	focusName: "tease",
	type: App.Porn.GenreType.quirk,
	prestigeDesc1: "Thousands have enjoyed $his lewd striptease",
	prestigeDesc2: "$His many fans relish $his lewd striptease",
	prestigeDesc3: "Millions are intimately familiar with $his lewd striptease",
	hitText: function(slave) { return `${getPronouns(slave).He} tantalizes viewers with ${getPronouns(slave).his} suggestive moves.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} stripping`; },
	valid: function(slave) { return slave.sexualQuirk === "tease"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.romantic = {
	fameVar: "romantic",
	fameName: "romantic",
	focusName: "romantic",
	type: App.Porn.GenreType.quirk,
	prestigeDesc1: "Thousands have enjoyed the deep bond $he shares with $his partners",
	prestigeDesc2: "$His many fans relish the deep bond $he shares with $his partners",
	prestigeDesc3: "Millions are intimately familiar with the deep bond $he shares with $his partners",
	hitText: function(slave) { return `${getPronouns(slave).He} draws viewers in with ${getPronouns(slave).his} genuine pleasure.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} sharing an orgasm with ${getPronouns(slave).his} partner`; },
	valid: function(slave) { return slave.sexualQuirk === "romantic"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.pervert = {
	fameVar: "pervert",
	fameName: "really perverted",
	focusName: "perverted",
	type: App.Porn.GenreType.quirk,
	prestigeDesc1: "Thousands have enjoyed $his most perverted tendencies",
	prestigeDesc2: "$His many fans relish the depths of $his perversions",
	prestigeDesc3: "Millions are intimately familiar with the depths of $his perversions",
	hitText: function(slave) { return `${getPronouns(slave).His} perverted tastes shock and allure viewers in ways they didn't even realize.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} doing something perverted`; }, /* FIXME: really, that's the best we could come up with??? */
	valid: function(slave) { return slave.sexualQuirk === "perverted"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.caring = {
	fameVar: "caring",
	fameName: "voyeur",
	focusName: "caring",
	type: App.Porn.GenreType.quirk,
	prestigeDesc1: "Thousands have enjoyed watching $him devote $himself to $his partners' pleasure",
	prestigeDesc2: "$His many fans relish $his devotion to $his partners' pleasure",
	prestigeDesc3: "Millions are intimately familiar with $his devotion to $his partners' pleasure",
	hitText: function(slave) { return `${getPronouns(slave).His} sincere devotion to ${getPronouns(slave).his} partner's pleasure draws in viewers with an interest in watching couples fuck.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} bringing ${getPronouns(slave).his} partner to orgasm`; },
	valid: function(slave) { return slave.sexualQuirk === "caring"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.unflinching = {
	fameVar: "unflinching",
	fameName: "unspeakable",
	focusName: "unflinching",
	type: App.Porn.GenreType.quirk,
	prestigeDesc1: "Thousands have enjoyed $his willingness to do things not repeated in polite company",
	prestigeDesc2: "$His many fans relish $his willingness to do anything and everything",
	prestigeDesc3: "Millions are intimately familiar with $his willingness to do things not repeated in polite company",
	hitText: function(slave) { return `${getPronouns(slave).His} willingness to do anything catches the attention of those who enjoy acts that should never be mentioned to others.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} doing something unmentionable`; },
	valid: function(slave) { return slave.sexualQuirk === "unflinching"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

App.Porn.Genre.sizeQueen = {
	fameVar: "sizeQueen",
	fameName: "huge insertion",
	focusName: "size queen",
	type: App.Porn.GenreType.quirk,
	prestigeDesc1: "Thousands have enjoyed the sight of $his holes filled to their limits",
	prestigeDesc2: "$His many fans relish the sight of $his holes filled to their limits",
	prestigeDesc3: "Millions are intimately familiar with the sight of $his holes filled to their limits",
	hitText: function(slave) { return `${getPronouns(slave).His} intent on taking the largest things possible into ${getPronouns(slave).his} holes draws in viewers with an interest for huge insertions.`; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).his} belly bulging from within`; },
	valid: function(slave) { return slave.sexualQuirk === "size queen"; },
	uiName: function() { return capFirstChar(this.focusName); }
};

/* Generic porn - leave this entry last */

App.Porn.Genre.general = {
	fameVar: "general",
	fameName: "generic",
	focusName: "porn",
	type: App.Porn.GenreType.generic,
	prestigeDesc1: "Thousands have enjoyed the sight of $him being used",
	prestigeDesc2: "$His many fans relish the sight of $him being used",
	prestigeDesc3: "Millions are intimately familiar with the sight of $him mid-coitus",
	hitText: function(slave) { return ``; },
	trinketShotDesc: function(slave) { return `showing ${getPronouns(slave).him} mid-coitus`; },
	valid: function(slave) { return true; /* anyone can do generic porn */ },
	uiName: function() { return "Smut is smut"; }
};

/** Returns a given genre by its fame name. */
App.Porn.getGenreByFameName = function(fameName) {
	return _.values(App.Porn.Genre).find((g) => g.fameName === fameName);
};

/** Returns a given genre by its focus name. */
App.Porn.getGenreByFocusName = function(focusName) {
	return _.values(App.Porn.Genre).find((g) => g.focusName === focusName);
};

/** Returns all the genres in the system. */
App.Porn.getAllGenres = function() {
	return _.values(App.Porn.Genre);
};

/** Returns all the genres with a given type. */
App.Porn.getGenresByType = function(type) {
	return _.values(App.Porn.Genre).filter((g) => g.type === type);
};

/** Returns the links necessary to set any valid porn genre for this slave.
 * @param {App.Entity.SlaveState} slave
 * @param {function(App.Entity.SlaveState) : void} callback
 * @returns {HTMLElement}
 */
App.Porn.genreChoiceLinks = function(slave, callback) {
	let makeLink = (genre) => {
		if (slave.porn.focus === genre.focusName) {
			return App.UI.DOM.disabledLink(genre.uiName(), [`Current focus`]);
		} else {
			return App.UI.DOM.link(genre.uiName(), (s, g) => {
				s.porn.focus = g.focusName;
				if (callback) {
					callback(s);
				}
			}, [slave, genre]);
		}
	};
	let links = this.getAllGenres().filter((g) => g.valid(slave)).map(makeLink);
	if (slave.porn.focus === "none") {
		links.push(App.UI.DOM.disabledLink("No focus", [`Already has no focus`]));
	} else {
		links.push(App.UI.DOM.link("No focus", (s) => {
			s.porn.focus = "none";
			if (callback) {
				callback(s);
			}
		}, [slave]));
	}
	return App.UI.DOM.generateLinksStrip(links);
};
