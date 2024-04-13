App.Events.SEIndependenceDay = class SEIndependenceDay extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.independenceDay === 1,
			() => (V.week-23) % 52 === 0
		];
	}

	execute(node) {
		let r = [];
		V.independenceDay = 0;

		const {
			HeP,
			heP, hisP
		} = getPronouns(V.PC).appendSuffix("P");

		const {girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");

		const fireworkCost = Math.trunc(10000*V.upgradeMultiplierTrade);
		const lockHigh = V.FSLockinLevel*0.9;
		const lockLow = V.FSLockinLevel*0.6;

		r.push(`Independence Day is this week.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`In the Free Cities, Independence Day falls on the day when the Free City achieved its de facto freedom from the laws of the old world. In most of the Free Cities, including yours, this was an unspectacular event that involved a lot of signing of contracts and not much storming of bastions. Nevertheless, this is the anniversary of the day that this tiny patch of earth became truly free, and its inhabitants became free to exercise their dominion over the freedom of others. It will pass unnoticed and uncelebrated unless you take action to make it special.`);

		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [new App.Events.Result(`Give a speech`, speech)]);

		App.Events.addResponses(node, [new App.Events.Result(`Pay for a lavish fireworks display`, fireworks, `Costs ${cashFormat(fireworkCost)}`)]);
		if (V.SF.Toggle && V.SF.Active >= 1) {
			App.Events.addResponses(node, [new App.Events.Result(`Host a parade`, parade)]);
		}

		function speech() {
			const frag = new DocumentFragment();
			r = [];
			const arc = V.arcologies[0];
			const arcInfo = new App.Utils.Arcology(arc);
			r.push(`You broadcast a speech to mark the occasion, using the arcology's media systems to reach a wide audience. It is unnecessary to make an effort to ensure attention;`);
			if (arc.FSChattelReligionistLaw === 1) {
				r.push(`the Prophet's word always receives complete attention on the rare occasions that it is publicly given.`);
			} else if (arc.FSRestart >= lockHigh) {
				r.push(`such an esteemed member of the Societal Elite can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSChattelReligionist >= lockHigh) {
				r.push(`the Keeper of the Blade and Chalice can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSRomanRevivalist >= lockHigh) {
				r.push(`the First Consul can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSNeoImperialist >= lockHigh) {
				r.push(`the Emperor commands absolute obedience from ${hisP} arcology, as even the Barons turn with rapt attention to their unquestioned lord.`);
			} else if (arc.FSAztecRevivalist >= lockHigh) {
				r.push(`the Head`);
				if (V.PC.title === 1) {
					r.push(`Priest`);
				} else {
					r.push(`Priestess`);
				}
				r.push(`may demand unwavering faith and sacrifice for the honor of the gods.`);
			} else if (arc.FSEgyptianRevivalist >= lockHigh) {
				r.push(`the Living`);
				if (V.PC.title === 1) {
					r.push(`God`);
				} else {
					r.push(`Goddess`);
				}
				r.push(`can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSEdoRevivalist >= lockHigh) {
				r.push(`the`);
				if (V.PC.title === 1) {
					r.push(`Emperor and Descendant of Amaterasu`);
				} else {
					r.push(`Amaterasu Reborn`);
				}
				r.push(`can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSArabianRevivalist >= lockHigh) {
				r.push(`the`);
				if (V.PC.title === 1) {
					r.push(`Caliph`);
				} else {
					r.push(`Handmaiden of Allah`);
				}
				r.push(`can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSChineseRevivalist >= lockHigh) {
				r.push(`the`);
				if (V.PC.title === 1) {
					r.push(`Emperor`);
				} else {
					r.push(`Empress`);
				}
				r.push(`and Holder of the Mandate of Heaven can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSAntebellumRevivalist >= lockHigh) {
				r.push(`the Reclaimer of the Cause and`);
				if (V.PC.title === 1) {
					r.push(`Lord of ${V.arcologies[0].name}`);
				} else {
					r.push(`Lady of ${V.arcologies[0].name}`);
				}
				r.push(`has the utmost respect from ${hisP} citizens and can command their complete attention the moment ${heP} wishes.`);
			} else if (arc.FSStatuesqueGlorification >= lockHigh) {
				r.push(`everyone must look up to ${HeP} Who Stands Above All.`);
			} else if (arc.FSSlaveProfessionalism >= lockHigh) {
				r.push(`the arcology pays complete attention when the Mastermind speaks ${hisP} thoughts.`);
			} else if (arc.FSSupremacist >= lockHigh) {
				r.push(`the Grand Champion of the Blood can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSSubjugationist >= lockHigh) {
				r.push(`the Grand Overseer of the Inferior Race can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSRepopulationFocus >= lockHigh) {
				r.push(`the`);
				if (V.PC.title === 1) {
					r.push(`Progenitor`);
				} else {
					r.push(`Midwife`);
				}
				r.push(`of the Future can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSGenderRadicalist >= lockHigh) {
				r.push(`the Buttfucker of All Slaves can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSGenderFundamentalist >= lockHigh) {
				r.push(`the`);
				if (V.PC.title === 1) {
					r.push(`Father`);
				} else {
					r.push(`Mother`);
				}
				r.push(`to the City can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSPaternalist >= lockHigh) {
				r.push(`the`);
				if (V.PC.title === 1) {
					r.push(`Protector`);
				} else {
					r.push(`Protectrix`);
				}
				r.push(`to All Slaves can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSDegradationist >= lockHigh) {
				r.push(`the Holder of the Rod and the Lash can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSBodyPurist >= lockHigh) {
				r.push(`the Purifier of the Breasts can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSAssetExpansionist >= lockHigh) {
				r.push(`the Expander of the Breasts can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSPastoralist >= lockHigh) {
				r.push(`the`);
				if (V.PC.title === 1) {
					r.push(`Master`);
				} else {
					r.push(`Mistress`);
				}
				r.push(`of Stock can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSPhysicalIdealist >= lockHigh) {
				r.push(`the beloved of Brodin can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSPetiteAdmiration >= lockHigh) {
				r.push(`the Supporter of the Small can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSMaturityPreferentialist >= lockHigh) {
				r.push(`the Grand Preserver of MILFS can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSYouthPreferentialist >= lockHigh) {
				r.push(`the Keeper of the Magnificent Young Harem can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSIntellectualDependency >= lockHigh) {
				r.push(`the Sovereign of Bimbos can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSChattelReligionist >= lockLow) {
				r.push(`as the Champion of the Faith can command complete attention from ${hisP} arcology the moment ${heP} wishes.`);
			} else if (arc.FSRomanRevivalist >= lockLow) {
				r.push(`as the Aedile, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSNeoImperialist >= lockLow) {
				r.push(`as the`);
				if (V.PC.title === 1) {
					r.push(`Lord and Master`);
				} else {
					r.push(`Lord and Mistress`);
				}
				r.push(`of the Arcology, you command enough respect that your citizens will listen to you attentively - so long as you do not abuse the privilege.`);
			} else if (arc.FSAztecRevivalist >= lockLow) {
				r.push(`as the Tlatcani, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSEgyptianRevivalist >= lockLow) {
				r.push(`as the Pharaoh, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSEdoRevivalist >= lockLow) {
				r.push(`as the Shogun, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSArabianRevivalist >= lockLow) {
				r.push(`as the ${(V.PC.title !== 1) ? "Sultana" : "Sultan"}, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSChineseRevivalist >= lockLow) {
				r.push(`as the`);
				if (V.PC.title === 1) {
					r.push(`Emperor,`);
				} else {
					r.push(`Empress,`);
				}
				r.push(`you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSAntebellumRevivalist >= lockLow) {
				r.push(`as the`);
				if (V.PC.title === 1) {
					r.push(`Lord`);
				} else {
					r.push(`Lady`);
				}
				r.push(`of the ${V.arcologies[0].name}, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSSlaveProfessionalism >= lockLow) {
				r.push(`as a Genius, you command enough attention that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSSupremacist >= lockLow) {
				r.push(`as the Champion of the Blood, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSSubjugationist >= lockLow) {
				r.push(`as the Overseer of the Inferior Race, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSGenderRadicalist >= lockLow) {
				r.push(`as the Sodomizer of the Traps, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSGenderFundamentalist >= lockLow) {
				r.push(`as the Defender of Women, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSPaternalist >= lockLow) {
				r.push(`as the`);
				if (V.PC.title === 1) {
					r.push(`Benefactor`);
				} else {
					r.push(`Benefactrix`);
				}
				r.push(`of Slaves, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSDegradationist >= lockLow) {
				r.push(`as the Subduer of Slaves, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSBodyPurist >= lockLow) {
				r.push(`as the Discerning, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSAssetExpansionist >= lockLow) {
				r.push(`as the Expander, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSPastoralist >= lockLow) {
				r.push(`as the Rancher, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSPhysicalIdealist >= lockLow) {
				r.push(`as ${HeP} of the Godlike Body, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSHedonisticDecadence >= lockLow) {
				r.push(`as the`);
				if (V.PC.title === 1) {
					r.push(`Master`);
				} else {
					r.push(`Lady`);
				}
				r.push(`of Softness, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSStatuesqueGlorification >= lockLow) {
				r.push(`as Agent of Growth, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSMaturityPreferentialist >= lockLow) {
				r.push(`as the Fucker of MILFS, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSYouthPreferentialist >= lockLow) {
				r.push(`as the Keeper of Virgins, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSPetiteAdmiration >= lockLow) {
				r.push(`as the Size Enthusiast, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			} else if (arc.FSIntellectualDependency >= lockLow) {
				r.push(`as the Shepherd of the Slow, you command enough respect that your citizens are likely to listen to you so long as you do not abuse the privilege.`);
			} else {
				r.push(`as the owner of the arcology, you command enough respect that your citizens will listen to you so long as you do not abuse the privilege.`);
			}
			r.push(`After you are announced, you greet the citizens of your arcology and begin by reviewing the state of things. You commend those most responsible for the arcology's current prosperity, and express confidence that it will continue to improve.`);
			if (V.daughtersVictory >= 1) {
				r.push(`You offer brief remembrance of those lost during the Daughters' attack on the arcology, and pledge that all enemies, foreign and domestic, will be similarly defeated.`);
			} else if (V.invasionVictory >= 1) {
				r.push(`You remind your citizens of the ongoing threat from the degenerating old world, and pledge to defeat all attacks as you helped defeat the recent invasion.`);
			} else if (V.nationHate > 1) {
				r.push(`You express resolution in the face of threats to the arcology, and pledge that they will be dealt with efficiently.`);
			}
			if (V.mercenaries >= 5) {
				r.push(`You mention the mercenaries that have become an integral part of arcology society, and compliment their efficiency.`);
			} else if (V.mercenaries >= 3) {
				r.push(`You mention the mercenaries that have a major place in the security of the arcology, and add that you hope they will become an even more integral part of its society.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Of course, you do not neglect the opportunity to improve your own position.`);
			if (V.PC.career === "wealth" || V.PC.career === "trust fund" || (V.PC.career === "rich kid" && V.PC.actualAge >= 18)) {
				r.push(`You recall your own wealthy background, cleverly drawing parallels between yourself and your richest citizens.`);
			} else if (V.PC.career === "rich kid") {
				r.push(`You flaunt your wealth a bit too much for someone your age, aggravating your would-be peers.`);
			} else if (V.PC.career === "capitalist" || V.PC.career === "entrepreneur") {
				r.push(`You briefly remind your listeners of your background as a successful ${V.PC.career}.`);
			} else if (V.PC.career === "business kid") {
				if (V.PC.actualAge >= 18) {
					r.push(`You briefly remind your listeners of how you started as nothing more than a child with some investment money, and to look at what you turned that money into.`);
				} else {
					r.push(`You share a brief outlook into your investment portfolio, but it is as young as you are, so it's mostly unimpressive.`);
				}
			} else if (V.PC.career === "mercenary" || V.PC.career === "recruit" || (V.PC.career === "child soldier" && V.PC.actualAge >= 18)) {
				r.push(`You share an impressive anecdote from your background as a mercenary; the moral of the story is that you know how to keep your head.`);
			} else if (V.PC.career === "child soldier") {
				r.push(`You share an impressive anecdote from your limited time as a mercenary; the moral of the story being that you know how to keep your head. From the murmurs, you can tell they suspect the enemy may have hesitated due to your age.`);
			} else if (V.PC.career === "slaver" || V.PC.career === "slave overseer") {
				r.push(`You share`);
				if (arc.FSPaternalist > 60) {
					r.push(`an amusing`);
				} else {
					r.push(`a cruelly amusing`);
				}
				r.push(`anecdote from your background as a slaver; the moral of the story is that you're not one to spare the lash when it's necessary.`);
			} else if (V.PC.career === "slave tender") {
				if (V.PC.actualAge >= 18) {
					r.push(`You share`);
					if (arc.FSPaternalist > 60) {
						r.push(`an amusing`);
					} else {
						r.push(`a cruelly amusing`);
					}
					r.push(`anecdote from your background working the slave pens; the moral of the story is that you recognize when a slave needs the lash.`);
				} else {
					r.push(`You share some`);
					if (arc.FSPaternalist > 60) {
						r.push(`amusing`);
					} else {
						r.push(`cruelly amusing`);
					}
					r.push(`anecdotes from your time in the slave pens demonstrating you know what it takes to break a willful slave. From the murmurs, you can tell you should have made it more clear that you were on the slaver's side of the cage, not the slave's.`);
				}
			} else if (V.PC.career === "engineer") {
				r.push(`You reference your background as an arcology engineer, cleverly making it obvious that you know this huge building down to its very bones.`);
			} else if (V.PC.career === "construction" || (V.PC.career === "worksite helper" && V.PC.actualAge >= 18)) {
				r.push(`You reference your background in construction, making it abundantly clear that you know what it takes to construct a building like ${arc.name} and, more importantly, how to keep it in working condition.`);
			} else if (V.PC.career === "worksite helper") {
				r.push(`You reference your background in construction, and that you've witnessed what it takes to build something like ${arc.name}. Of course, plenty of people have watched a building being built, so what you're saying isn't at all impressive.`);
			} else if (V.PC.career === "medicine") {
				r.push(`You share an impressive anecdote from your background as a surgeon; the moral of the story is that you can be trusted with a delicate operation.`);
			} else if (V.PC.career === "medical assistant" || (V.PC.career === "nurse" && V.PC.actualAge >= 18)) {
				r.push(`You share an impressive anecdote from your background in medicine; the moral of the story is that you are far more capable than you appear.`);
			} else if (V.PC.career === "nurse") {
				r.push(`You share some of the more impressive acts of care you've performed as a nurse; the moral of the story is that your heart is in the right place. From the murmurs, it would seem the crowd favors strength over mercy.`);
			} else if (V.PC.career === "gang" || V.PC.career === "hoodlum" || (V.PC.career === "street urchin" && V.PC.actualAge >= 18)) {
				r.push(`You share a bloody anecdote about the fate of one of your former gang members. The moral of the story is that you have to know your limits.`);
			} else if (V.PC.career === "street urchin") {
				r.push(`You share a depressing anecdote about how far some of the other street kids had to go to eke out even a meager living; the moral of the story is that you've been hardened by a tough life. Though you left out the parts about what you yourself had to go through, you can tell the crowd knows to some extent.`);
			} else if (V.PC.career === "escort" || V.PC.career === "prostitute" || (V.PC.career === "child prostitute" && V.PC.actualAge >= 18)) {
				r.push(`You share a rather sordid anecdote from your background as`);
				if (V.PC.career === "escort") {
					r.push(`an escort;`);
				} else {
					r.push(`a prostitute;`);
				}
				r.push(`the moral of the story is that you can go very far when you know the right people, or things about said people.`);
			} else if (V.PC.career === "child prostitute") {
				if (V.PC.actualAge <= V.minimumSlaveAge) {
					r.push(`You start to share a rather sordid anecdote from your time selling your body in a brothel, but cut it short when it becomes apparent that the crowd is appalled at the thought of someone as young as you being forced to do such things.`);
				} else {
					r.push(`You share a rather sordid anecdote from your time selling your body in a brothel; the moral of the story is knowing the right peoples' dirty little secrets can get you quite far in life. From the murmurs, it would appear the crowd is a little uncomfortable with someone as young as you being as well-traveled as you are.`);
				}
			} else if (V.PC.career === "servant" || V.PC.career === "handmaiden" || (V.PC.career === "child servant" && V.PC.actualAge >= 18)) {
				r.push(`You share some of the highlights of your late Master's life; the moral of the story is that you've seen how to lead from someone who was a leader... It didn't help your standing much.`);
			} else if (V.PC.career === "child servant") {
				r.push(`You share some personal stories of your time with your late Master. While the crowd may find them adorable, they really do more harm than good to your standing as a leader.`);
			} else if (V.PC.career === "celebrity" || V.PC.career === "rising star" || (V.PC.career === "child star" && V.PC.actualAge >= 18)) {
				r.push(`You share a hilarious anecdote from your background as a celebrity, one which the old world tabloids never did learn about, until now.`);
			} else if (V.PC.career === "child star") {
				r.push(`You share some anecdotes from your background as a celebrity, but from the muttering, you can tell the crowd questions if your running the arcology is not just some publicity stunt.`);
			} else if (V.PC.career === "BlackHat" || V.PC.career === "hacker" || (V.PC.career === "script kiddy" && V.PC.actualAge >= 18)) {
				r.push(`You share a series of juicy details of some old world politicians, driving home just how much you know.`);
			} else if (V.PC.career === "script kiddy") {
				r.push(`You share a series of juicy details of some rather prominent old world individuals, but from the muttering, you can tell the crowd is wondering if you're serious about running the arcology or if this is just another game to you.`);
			} else {
				r.push(`You cast yourself as one of the leading citizens of the Free Cities, from the beginning.`);
			}
			r.push(`Transitioning to the future, you supply fresh fuel for rumors about how you managed to acquire the arcology by expressing confidence that`);
			if (V.PC.rumor === "wealth") {
				r.push(`sufficient wealth`);
			} else if (V.PC.rumor === "diligence") {
				r.push(`hard work and diligence`);
			} else if (V.PC.rumor === "force") {
				r.push(`a good supply of ammunition`);
			} else if (V.PC.rumor === "social engineering") {
				r.push(`cultural development`);
			} else {
				r.push(`positivity`);
			}
			r.push(`will remain the answer to any new crises that may confront the arcology.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`With this bridge, you move to arcology culture.`);
			if (FutureSocieties.isActive('FSRomanRevivalist', arc)) {
				if (arc.FSRomanRevivalist >= 90) {
					r.push(`You speak warmly of the state of New Rome, and express a hope that Roman honor and justice shall once again last a thousand years.`);
				} else if (arc.FSRomanRevivalist >= 40) {
					r.push(`You ask that your citizens will support Roman values.`);
				}
			} else if (FutureSocieties.isActive('FSNeoImperialist', arc)) {
				if (arc.FSNeoImperialist >= 90) {
					r.push(`You speak warmly of the state of the magnificent new Imperial society that you have built together, and proclaim that your mighty Empire will stand amongst the ashes, no matter what the world seeks to throw at it.`);
				} else if (arc.FSNeoImperialist >= 40) {
					r.push(`You ask that your citizens believe in your Imperial right to rule, and build a new society that will stand the test of time together.`);
				}
			} else if (FutureSocieties.isActive('FSAztecRevivalist', arc)) {
				if (arc.FSAztecRevivalist >= 90) {
					r.push(`You speak warmly of the state of the new golden City of the Gods, and express a hope that this time, the empire will stand forever.`);
				} else if (arc.FSAztecRevivalist >= 40) {
					r.push(`You ask that your citizens strengthen their belief in the Aztec Gods.`);
				}
			} else if (FutureSocieties.isActive('FSEgyptianRevivalist', arc)) {
				if (arc.FSEgyptianRevivalist >= 90) {
					r.push(`You speak warmly of the state of the new land of the Nile, and express a hope that that most enduring of cultures shall endure again.`);
				} else if (arc.FSEgyptianRevivalist >= 40) {
					r.push(`You ask that your citizens will support the beauty of ancient Egypt.`);
				}
			} else if (FutureSocieties.isActive('FSEdoRevivalist', arc)) {
				if (arc.FSEdoRevivalist >= 90) {
					r.push(`You speak warmly of the state of the new land of Amaterasu, and express a hope that honor and virtue shall never cease their advance towards perfection.`);
				} else if (arc.FSEdoRevivalist >= 40) {
					r.push(`You ask that your citizens will support the honor and beauty of Edo culture.`);
				}
			} else if (FutureSocieties.isActive('FSArabianRevivalist', arc)) {
				if (arc.FSArabianRevivalist >= 90) {
					r.push(`You speak warmly of the state of the new Caliphate, and express a hope that its prosperity shall continue to encompass more people each day.`);
				} else if (arc.FSArabianRevivalist >= 40) {
					r.push(`You ask that your citizens will continue to enjoy the good works of the new Caliphate.`);
				}
			} else if (FutureSocieties.isActive('FSChineseRevivalist', arc)) {
				if (arc.FSChineseRevivalist >= 90) {
					r.push(`You speak warmly of the state of the Middle Kingdom, and express a hope that it will continue to be worthy of the Mandate of Heaven.`);
				} else if (arc.FSChineseRevivalist >= 40) {
					r.push(`You ask that your citizens will continue to support your pursuit of the Mandate of Heaven.`);
				}
			} else if (FutureSocieties.isActive('FSAntebellumRevivalist', arc)) {
				if (arc.FSAntebellumRevivalist >= 90) {
					r.push(`You speak warmly of the state of the magnificent new Southron society that you have built together, and express a hope that it's strength will never again falter. `);
				} else if (arc.FSAntebellumRevivalist >= 40) {
					r.push(`You ask that your citizens will support the beauty of the American South and to uphold it's God-given principles.`);
				}
			}
			if (FutureSocieties.isActive('FSChattelReligionist', arc)) {
				if (arc.FSChattelReligionist >= 90) {
					r.push(`You speak warmly of the spiritual state of the arcology, and express a hope that enjoyment of the pleasure of creation through the holy office of sexual slavery will be perpetual.`);
				} else if (arc.FSChattelReligionist >= 40) {
					r.push(`You ask that your citizens will continue to support the new faith by regularly fucking their sex slaves.`);
				}
			}
			if (FutureSocieties.isActive('FSIntellectualDependency', arc)) {
				if (arc.FSIntellectualDependency >= 90) {
					r.push(`You almost lose track of time rhapsodizing about bimbos and their bottomless appetite for sex, but it's not like your citizens ever tire of the subject.`);
				} else if (arc.FSIntellectualDependency >= 40) {
					r.push(`You ask your citizens to help a horny bimbo ease their stress tonight.`);
				}
			} else if (FutureSocieties.isActive('FSSlaveProfessionalism', arc)) {
				if (arc.FSSlaveProfessionalism >= 90) {
					r.push(`You speak in depth of the benefits of a keen mind in a skilled slave and before long the crowd has sparked a discussion on the topic.`);
				} else if (arc.FSSlaveProfessionalism >= 40) {
					r.push(`You ask that your citizens stop and have a conversation with a slave every now and then. They may be surprised.`);
				}
			}
			if (FutureSocieties.isActive('FSDegradationist', arc)) {
				if (arc.FSDegradationist >= 90) {
					r.push(`You speak warmly of the degraded state of the arcology's slaves, and express a hope that your citizens will remain vigilant on this matter.`);
				} else if (arc.FSDegradationist >= 40) {
					r.push(`You ask that your citizens will continue to be inventive in coming up with new ways to degrade sex slaves.`);
				}
			} else if (FutureSocieties.isActive('FSPaternalist', arc)) {
				if (arc.FSPaternalist >= 90) {
					r.push(`You speak warmly of the creditable state of the arcology's slaves, and express a hope that their improvement will never stop.`);
				} else if (arc.FSPaternalist >= 40) {
					r.push(`You ask that your citizens will make an effort to leave at least one slave happier tonight than she was this morning.`);
				}
			}
			if (FutureSocieties.isActive('FSYouthPreferentialist', arc)) {
				if (arc.FSYouthPreferentialist >= 90) {
					r.push(`You almost lose track of time rhapsodizing about young girls, but it's not like your citizens ever tire of the subject.`);
				} else if (arc.FSYouthPreferentialist >= 40) {
					r.push(`You rhapsodize about how wonderful sex with a tight young girl is, and encourage citizens who haven't done so to give it a try.`);
				}
			} else if (FutureSocieties.isActive('FSMaturityPreferentialist', arc)) {
				if (arc.FSMaturityPreferentialist >= 90) {
					r.push(`You almost lose track of time rhapsodizing about mature women, but it's not like your citizens ever tire of the subject.`);
				} else if (arc.FSMaturityPreferentialist >= 40) {
					r.push(`You rhapsodize about how wonderful sex with a mature woman is, and encourage citizens who haven't done so to give it a try.`);
				}
			}
			if (FutureSocieties.isActive('FSPetiteAdmiration', arc)) {
				if (arc.FSPetiteAdmiration >= 90) {
					r.push(`You almost lose track of time rhapsodizing about short slaves, but it's not like your citizens ever tire of the subject.`);
				} else if (arc.FSPetiteAdmiration >= 40) {
					r.push(`You rhapsodize about how magical it is to have a slave casually walk up and put their mouth to work without having to kneel down, and encourage citizens who haven't done so to give it a try.`);
				}
			} else if (FutureSocieties.isActive('FSStatuesqueGlorification', arc)) {
				if (arc.FSStatuesqueGlorification >= 90) {
					r.push(`You almost lose track of time rhapsodizing about tall women, but it's not like your citizens ever tire of the subject.`);
				} else if (arc.FSStatuesqueGlorification >= 40) {
					r.push(`You implore your citizens to not waste their time on the short and instead focus only on the tall.`);
				}
			}
			if (FutureSocieties.isActive('FSRepopulationFocus', arc)) {
				if (arc.FSRepopulationFocus >= 90) {
					r.push(`You rhapsodize on the wonderful display of pregnancies you see daily, and affirm that the arcology will continue to be a bastion of the future.`);
				} else if (arc.FSRepopulationFocus >= 40) {
					r.push(`You ask that your citizens will make an effort to put a child in at least one of their slaves tonight.`);
				}
			} else if (FutureSocieties.isActive('FSRestart', arc)) {
				if (arc.FSRestart >= 90) {
					r.push(`You implore your citizens to cease reproducing and accept the Societal Elite as the world's heirs.`);
				} else if (arc.FSRestart >= 40) {
					r.push(`You ask that your citizens will make an effort to prevent slave pregnancies.`);
				}
			}
			if (FutureSocieties.isActive('FSAssetExpansionist', arc)) {
				if (arc.FSAssetExpansionist >= 90) {
					r.push(`You rhapsodize on the wonderful display of tits and ass you see daily, and affirm that despite this, no boob is ever big enough, and the expansion should never stop.`);
				} else if (arc.FSAssetExpansionist >= 40) {
					r.push(`You request that your citizens continue to do their best to expand their slaves' breasts.`);
				}
			} else if (FutureSocieties.isActive('FSSlimnessEnthusiast', arc)) {
				if (arc.FSSlimnessEnthusiast >= 90) {
					r.push(`You rhapsodize on the wonderfully girlish bodies you see daily, and affirm that the arcology will continue to make its own way in slave fashion.`);
				} else if (arc.FSSlimnessEnthusiast >= 40) {
					r.push(`You request that your citizens continue to do their best to keep their slaves fit and slim.`);
				}
			}
			if (FutureSocieties.isActive('FSTransformationFetishist', arc)) {
				if (arc.FSTransformationFetishist >= 90) {
					r.push(`You note some of the most interesting transformations you've seen in the arcology, and hold them up as examples of surgical inventiveness.`);
				} else if (arc.FSTransformationFetishist >= 40) {
					r.push(`You advocate for continued research and development into new ways to surgically transform slaves.`);
				}
			} else if (FutureSocieties.isActive('FSBodyPurist', arc)) {
				if (arc.FSBodyPurist >= 90) {
					r.push(`You note your approval of the arcology's progress in achieving slave beauty without polluting slave bodies, and hope it will never stop.`);
				} else if (arc.FSBodyPurist >= 40) {
					r.push(`You advocate for continued research and development into less invasive ways of altering slaves' bodies.`);
				}
			}
			if (FutureSocieties.isActive('FSGenderRadicalist', arc)) {
				if (arc.FSGenderRadicalist >= 90) {
					r.push(`You review your arcology's near-perfect eagerness to treat every slave like the girl she is with approval.`);
				} else if (arc.FSGenderRadicalist >= 40) {
					r.push(`You argue for continued progress towards a society that is willing to accept anyone who sucks dick or takes a buttfuck as a girl.`);
				}
			} else if (FutureSocieties.isActive('FSGenderFundamentalist', arc)) {
				if (arc.FSGenderFundamentalist >= 90) {
					r.push(`You review your arcology's refinement of old world gender mores into a future populated by beautiful slave women with approval.`);
				} else if (arc.FSGenderFundamentalist >= 40) {
					r.push(`You argue for continued progress towards a society that maintains all the best parts of old world gender mores.`);
				}
			}
			if (FutureSocieties.isActive('FSPhysicalIdealist', arc)) {
				if (arc.FSPhysicalIdealist >= 90) {
					r.push(`You wax poetic on the physical achievements of your arcology, but caution your citizens that perfection in this area is impossible: one must always strive.`);
				} else if (arc.FSPhysicalIdealist >= 40) {
					r.push(`You review some recent physical achievements by notable slaves, compliment their owners, and express a hope for continued physical development.`);
				}
			} else if (FutureSocieties.isActive('FSHedonisticDecadence', arc)) {
				if (arc.FSHedonisticDecadence >= 90) {
					r.push(`You implore your citizens to sit back with a nice cold drink, a big plate of their favorite foods, and a perfectly plush slave${girlU} between their legs.`);
				} else if (arc.FSHedonisticDecadence >= 40) {
					r.push(`You ask your citizens to relax and take a load off, to enjoy life while they have the chance.`);
				}
			}
			if (FutureSocieties.isActive('FSSupremacist', arc)) {
				if (arc.FSSupremacist >= 90) {
					r.push(`You express confidence in the state of the ${arc.FSSupremacistRace} race in your arcology, and express the hope that it will serve as a worldwide model.`);
				} else if (arc.FSSupremacist >= 40) {
					r.push(`You compliment the ${arc.FSSupremacistRace} citizens who have done the most work to exalt their race over others.`);
				}
			}
			if (FutureSocieties.isActive('FSSubjugationist', arc)) {
				if (arc.FSSubjugationist >= 90) {
					r.push(`You mention the state of the ${arc.FSSubjugationistRace} race here with approval, but ask your citizens to continue to support you here, since vigilance will never be unnecessary.`);
				} else if (arc.FSSubjugationist >= 40) {
					r.push(`You commend your citizens for their attention to subjugation of the ${arc.FSSubjugationistRace} race, and exhort them to greater efforts there.`);
				}
			}
			if (FutureSocieties.isActive('FSPastoralist', arc)) {
				if (arc.FSPastoralist >= 90) {
					r.push(`You communicate your pride in the state of cow husbandry in your arcology, and hope that its global cachet for quality will continue to grow.`);
				} else if (arc.FSPastoralist >= 40) {
					r.push(`You tell the touching story of the arcology's most loving cow, and offer some lessons to slaveowners from it.`);
				}
			}
			r.push(`You conclude by briefly recounting the story of the founding of the Free City, the building of the arcology, and what is publicly known of your accession to ownership, before a ringing close that reminds your citizens that they have the freedom to decide where their stories in the Free Cities go from there. Your speech is <span class="green">very well received.</span>`);
			if ((["business kid", "child prostitute", "child servant", "child soldier", "child star", "nurse", "rich kid", "script kiddy", "slave tender", "street urchin", "worksite helper"].includes(V.PC.career) && V.PC.actualAge < 18) || V.PC.career === "handmaiden" || V.PC.career === "servant") {
				repX(500, "event");
			} else {
				repX(1000, "event");
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function fireworks() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`Once darkness falls outside the arcology, a traditional fireworks display erupts from mortars mounted on your penthouse balconies. The noise and light <span class="green">delights</span> your citizens, terrifies the arcology's stupider slaves, and serves a useful ancillary purpose in defense preparedness. The arcology's radar and laser sensors track the display, using it as an opportunity to calibrate the point defense systems on real targets. There is general agreement that this sort of thing should be a yearly tradition here, just like it was in some parts of the old world: old ideas aren't all bad.`);
			repX(5000, "event");
			cashX(forceNeg(fireworkCost), "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function parade() {
			const frag = new DocumentFragment();
			r = [];
			let repChange = 0;
			if (V.SF.ArmySize < 100) {
				r.push(`The tiny size of ${V.SF.Lower} does not inspire confidence in your citizens.`);
				repChange -= 200;
			} else if (V.SF.ArmySize < 2000) {
				r.push(`The almost full size of ${V.SF.Lower} inspires confidence in your citizens.`);
				repChange += 1250;
			} else {
				/* TODO: line for huge army */
			}

			if (V.SF.Squad.Armoury === 0) {
				r.push(`Seeing the soldiers of ${V.SF.Lower} with high-quality personal weapons and light armor, but little in the way of exceptional armament, provides little confidence in ${V.SF.Lower}.`);
				repChange -= 200;
			} else {
				r.push(`The citizens of ${V.arcologies[0].name} are relieved to see that ${V.SF.Lower}'s troops are outfitted with the absolute latest gear.`);
				repChange += 1250;
			}

			if (V.SF.Squad.Drugs === 0) {
				r.push(`The relaxed demeanor of ${V.SF.Lower}'s soldiers inspires confidence that they are unlikely to`);
				repChange += 1250;
			} else {
				r.push(`The slight twitchiness and high-end alertness of ${V.SF.Lower}'s troops makes your citizens afraid that they may`);
				repChange -= 200;
			}
			r.push(`get a face full of lead.`);

			if (V.terrain !== "oceanic") {
				if (V.SF.Squad.AV < 1 && V.SF.Squad.TV < 1) {
					r.push(`The use of basic, unarmored civilian vehicles with jury-rigged crew-served weapons by ${V.SF.Lower} does not`);
					repChange -= 200;
				} else if (V.SF.Squad.AV < 11 && V.SF.Squad.TV < 11) {
					r.push(`The advanced heavy armor and support vehicles in use by ${V.SF.Lower}`);
					repChange += 1250;
				}
				r.push(`inspire confidence in your citizens.`);
			}

			if (V.SF.Squad.AA < 1 && V.SF.Squad.TA < 1 ) {
				r.push(`Seeing the single squadron of meagerly-armed old aircraft ${V.SF.Lower} calls an "air force" does not reassure your citizens.`);
				repChange -= 200;
			} else if (V.SF.Squad.AA < 11 && V.SF.Squad.TA < 11) {
				r.push(`Seeing the numerous advanced aircraft of ${V.SF.Lower}'s air force assures your citizens that they are safe from the air.`);
				repChange += 1250;
			}

			if (V.SF.Squad.Drones === 0) {
				r.push(`Seeing repurposed non-military drones from the arcology's original contingent flying around does not inspire confidence in your citizens.`);
				repChange -= 200;
			} else {
				r.push(`Seeing the latest and greatest drones buzzing over head assures your citizens that they are unmatched.`);
				repChange += 1250;
			}

			if (V.terrain !== "oceanic" && V.SF.Squad.GiantRobot === 1) {
				r.push(`The ramshackle-looking Giant Robot that ${V.SF.Lower} has cobbled together inspires more fear of it falling apart than trust in its ability to protect the arcology.`);
				repChange -= 200;
				/* TODO: Add a line for partially-upgraded Giant Robot? */
			} else if (V.terrain !== "oceanic" && V.SF.Squad.GiantRobot === 10) {
				r.push(`Seeing that the Giant Robot has been fully upgraded provides your citizens with a feeling of safety.`);
				repChange += 1250;
			}

			if (V.SF.ROE === "hold" && V.SF.Depravity >= 1.5) {
				r.push(`The sight of ${V.SF.Lower}'s troops forcing their captured slaves to suck them off while visibly itching to draw their weapons inspires terror in your citizens.`);
				repChange -= 200;
			} else if (V.SF.ROE === "limited" && V.SF.Depravity >= 1.5) {
				r.push(`The sight of ${V.SF.Lower}'s troops forcing their captured slaves to suck them off with itchy trigger fingers inspires terror in your citizens.`);
				repChange -= 200;
			} else if (V.SF.ROE === "free" && V.SF.Depravity >= 1.5) {
				r.push(`The sight of ${V.SF.Lower}'s troops forcing their captured slaves to suck them off while frequently firing wildly into the air inspires terror in your citizens.`);
				repChange -= 200;
			}

			if (V.SF.ROE === "hold" && V.SF.Depravity <= 0.3) {
				r.push(`The sight of ${V.SF.Lower}'s troops professionally holstering their weapons provides your citizens with a sense of safety.`);
				repChange += 1250;
			} else if (V.SF.ROE === "limited" && V.SF.Depravity <= 0.3) {
				r.push(`The sight of ${V.SF.Lower}'s troops professionally keeping their finger off the trigger provides your citizens with a sense of safety.`);
				repChange += 1250;
			} else if (V.SF.ROE === "free" && V.SF.Depravity <= 0.3) {
				r.push(`The sight of ${V.SF.Lower}'s troops professionally remaining alert and ready to act at a moment's notice provides your citizens with a sense of safety.`);
				repChange += 1250;
			}
			// Maybe a random chance attack by the Daughters of Liberty if they haven't been already defeated or if they have a cell that managed to survive. The size of the attack could depend the time since their last encounter. The amount of damage inflicted would depend primarily on whether hacker's support was acquired, V.bodyguard's combat skill, the player's combat skill, SF upgrades and finally some RNG. If a low amount of damage is inflicted then there will be a low hit to rep and some criminals can be acquired or dealt with in the usual manner. Higher amounts of damage leads to higher hits to rep and a chance that fewer attackers will survive. Without a bodyguard there is a chance that PC may die or be held hostage with a chance of being killed if the rescue attempt is botched.
			// I was thinking providing an option (potentially #result3) of giving a speech with it being a duplicate of the above speech just for completeness' sake however it would be redundant except for a line or two about the outcome of attack if it fired (i.e. listing the number of dead/captured attackers (potentially #result4) and dead soldiers with a couple of potential options (potentially #result5); to erect a statute or such acknowledge them and if one is already present to add them on to it, to provide support for their families. Also the amount of monetary damage, did V.bodyguard die or just get wounded and if so how severely. Finally a closing message with how the PC wishes to react to it (potentially #result6); e.g. be vigilant, it's a one-off, act of war, 'we will not give into terrorist attacks', etc.
			repX(repChange, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
