App.Events.REMFluctuations = class REMFluctuations extends App.Events.BaseEvent {
	get weight() {
		this.params.REM = 0;
		if (random(1, 100) > V.slaveCostFactor*50) {
			this.params.REM += 1;
		}
		if (random(1, 100) < V.slaveCostFactor*50) {
			this.params.REM -= 1;
		}
		return this.params.REM ? 2 : 0;
	}

	execute(node) {
		let r = [];

		const {
			HeA, HisA,
			heA, hisA, himA, girlA, himselfA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {
			HeM, HisM,
			heM, hisM, girlM, himM, womanM, loliM,
		} = getPronouns(assistant.pronouns().market).appendSuffix("M");

		const fluctuationType = (this.params.REM === 1)
			? either("antislavery terrorism", "medical breakthrough", "new free city", "revel", "speculation", "tainted drugs")
			: either("anti-slavery coup", "arcology change", "bankruptcy", "empty prisons", "hostilities ended", "refugee boat", "unemployment", "war");

		if (V.assistant.personality > 0) {
			if (V.assistant.market) {
				r.push(`The market assistant's avatar appears on a wallscreen as you're going about your business.`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`The regular monster ${girlA} stands behind and prods the human ${girlM} forward.`);
						break;
					case "shemale":
						r.push(`You recognize ${hisM} function by ${hisM} glasses and because ${hisM} bimbo cock softens, halfway, while ${heM} addresses you on economic matters.`);
						break;
					case "amazon":
						r.push(`${HeM} illustrates a small group of gossiping tribeswomen that fades away as ${heM} leaves them and approaches you.`);
						break;
					case "businesswoman":
						r.push(`The junior business ${womanM} adopts a shy posture when addressing you directly, as if unsuccessfully concealing a workplace crush.`);
						break;
					case "goddess":
						r.push(`The demigoddess portrait arrives in a glittery cloud of dust, wearing winged shoes.`);
						break;
					case "schoolgirl":
						r.push(`Both`);
						if (girlA === girlM) {
							r.push(`school${girlA}s`);
						} else {
							r.push(`students`);
						}
						r.push(`are sitting knee to knee; the nerdy one hands the other a folded note. "Pass it on," ${heM} stage whispers.`);
						if (V.assistant.name === "your personal assistant") {
							r.push(`Your regular assistant`);
						} else {
							r.push(`${V.assistant.name}`);
						}
						r.push(`rolls ${hisA} eyes.`);
						break;
					case "hypergoddess":
						r.push(`The demigoddess portrait arrives in a glittery cloud of dust, wearing winged shoes and a noticeable roundness in ${hisM} middle.`);
						break;
					case "loli":
						r.push(`The chubby, glasses-wearing ${loliM} arrives holding a neatly folded note addressed to you.`);
						break;
					case "preggololi":
						r.push(`The chubby, glasses-wearing ${loliM} arrives holding a hastily written note addressed to you. ${HeM} seems kind of winded, with a suspicious stain in ${hisM} panties under ${hisM} pussy.`);
						break;
					case "fairy":
					case "pregnant fairy":
						r.push(`The older fairy flutters into view before, curtseys, and holds out a rolled piece of parchment addressed to you.`);
						break;
					case "normal":
						r.push(`${HisM} symbol lights up in regular green pulses while ${heM} waits for your attention.`);
						break;
					case "angel":
						r.push(`The short haired angel lands before you, a rolled piece of parchment under ${hisM} arm.`);
						break;
					case "cherub":
						r.push(`The short haired cherub flutters before you holding a rolled piece of parchment in ${hisM} hands.`);
						break;
					case "incubus":
						r.push(`The regular incubus stands behind and prods the human ${girlM} forward with ${hisA} dick.`);
						break;
					case "succubus":
						r.push(`The regular succubus stands behind and pushes the human ${girlM} forward.`);
						break;
					case "imp":
						r.push(`The short haired imp flaps before you holding a rolled piece of parchment in ${hisM} hands.`);
						break;
					case "witch":
						r.push(`The apprentice's apprentice arrives before you; a message begins playing the moment ${heM} opens ${hisM} mouth.`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`The creature finishes forcing eggs into the human ${girlM}, leaving ${himM} to stagger towards you clutching a crumpled letter in one hand and struggling to hold back the eggs with the other.`);
				}
			} else {
				r.push(`${capFirstChar(V.assistant.name)} appears on a wallscreen as you're going about your business.`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`He's looking unusually businesslike, with ${hisA} tentacle hair restrained in a bun.`);
						break;
					case "loli":
						r.push(`He's looking unusually businesslike, withdrawn deep in thought.`);
						break;
					case "preggololi":
						r.push(`He's looking unusually businesslike, withdrawn deep in thought.`);
						break;
					case "shemale":
						r.push(`He's looking unusually businesslike, with ${hisA} perpetually erect dick going untended, for once.`);
						break;
					case "amazon":
						r.push(`He's looking unusually businesslike, and is doing sums on a primitive little abacus.`);
						break;
					case "businesswoman":
						r.push(`He has a clipboard pressed against ${hisA} generous bosom, and peers at you over the tops of ${hisA} spectacles.`);
						break;
					case "fairy":
						r.push(`He's looking unusually businesslike, wearing a tiny business suit with an opening in the back for ${hisA} wings to come out.`);
						break;
					case "pregnant fairy":
						r.push(`He's looking unusually businesslike, wearing a tiny business suit open in the front to let ${hisA} swollen belly out and another opening in the back for ${hisA} wings to come out.`);
						break;
					case "goddess":
					case "hypergoddess":
						r.push(`He's looking unusually businesslike, with ${hisA} hands clasped behind ${hisA} back and pivoting one foot.`);
						break;
					case "schoolgirl":
						r.push(`He's looking unusually businesslike, and has a scribbled note in ${hisA} hand.`);
						break;
					case "angel":
						r.push(`He's looking unusually businesslike; deep in thought with ${hisA} hands together in front of ${himA}.`);
						break;
					case "cherub":
						r.push(`He's looking unusually businesslike, reading a newspaper titled "Heaven's Post".`);
						break;
					case "incubus":
						r.push(`He's looking unusually businesslike, with ${hisA} typically erect dick flaccid for once.`);
						break;
					case "succubus":
						r.push(`He's looking unusually businesslike, wearing a slutty business suit, glasses and ${hisA} hair in a tight bun. A slight buzzing can be heard from under ${hisA} skirt.`);
						break;
					case "imp":
						r.push(`He's looking unusually businesslike, reading a list titled "Hell's Holes".`);
						break;
					case "witch":
						r.push(`He's looking unusually businesslike, nose first in a book titled "Economics and You".`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`He's looking unusually businesslike, wearing an ill-fitted business suit. ${HisA} blouse buttons pop off as ${hisA} belly swells grotesquely, before the object within ${himA} begins steadily moving upwards.`);
						break;
					default:
						r.push(`${HisA} symbol spins for attention.`);
				}

				r.push(`"${properTitle()}, I have a news item that may be of business interest," ${heA}`);
				switch (V.assistant.appearance) {
					case "monstergirl":
					case "normal":
						r.push(`informs you.`);
						break;
					case "shemale":
						r.push(`says seriously.`);
						break;
					case "amazon":
						r.push(`says warmly.`);
						break;
					case "businesswoman":
						r.push(`says diffidently.`);
						break;
					case "goddess":
						r.push(`announces.`);
						break;
					case "schoolgirl":
						r.push(`reads aloud.`);
						break;
					case "hypergoddess":
						r.push(`announces between ${hisA} children's kicking.`);
						break;
					case "loli":
					case "preggololi":
						r.push(`says cutely.`);
						break;
					case "fairy":
					case "pregnant fairy":
						r.push(`says excitedly.`);
						break;
					case "angel":
						r.push(`calmly states.`);
						break;
					case "cherub":
					case "imp":
						r.push(`says enthusiastically.`);
						break;
					case "incubus":
						r.push(`starts, pauses to play with ${himselfA}, and continues.`);
						break;
					case "succubus":
						r.push(`says between overly loud moans.`);
						break;
					case "witch":
						r.push(`states, finishes the page, and snaps ${hisA} fingers. He grunts, reaches up ${hisA} skirt and pulls out a message for you. Seems it didn't arrive as planned.`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`says, ${hisA} throat bulging as the egg containing the message passes out ${hisA} mouth.`);
				}
			}
		} else {
			r.push(`Your`);
			if (V.assistant.market) {
				r.push(`market`);
			} else {
				r.push(`personal`);
			}
			r.push(`assistant's symbol appears on a wallscreen as you're going about your business. ${HeA} spins for your attention. "${properTitle()}, I have a news item that may be of business interest," ${heA} says.`);
		}
		App.Events.addParagraph(node, r);
		r = [];

		/* The events reducing slave prices are all supply sided. Without events reducing demand this is a little unbalanced. A minor issue */
		if (fluctuationType === "revel") {
			r.push(`Something is happening in one of the Free Cities' richest arcologies. It's not clear what, exactly, it is, since its owner is making skillful use of the arcology's advanced surveillance and media systems to keep its internal affairs quite secret. The truth will get out eventually, and it's probably not going to do much for old world opinions of the Free Cities. After all, cheap slaves go into that arcology at a prodigious rate, and they don't seem to ever come out again. The unexpected demand for slaves, any slaves, has produced a temporary tightening of the entire slave market. Projections suggest price increases of up to five percent. There will be no immediate impact on you or your slaves, but the coming weeks will be a great time to sell stock, and a bad time to buy. <span class="noteworthy">The market price of slaves has increased.</span>`);
			V.menialDemandFactor += 12000;
		} else if (fluctuationType === "tainted drugs") {
			r.push(`The Free Cities are anarcho-capitalist paradises — or 'paradises,' depending on one's station and assets. You can't complain personally, as one of the Free Cities' richest citizens, master of your own arcology and owner of sexual slaves. Unfortunately quite a few slaves in the markets are in a position to complain today, as are their owners. Many slave markets use long-lasting stimulants to pep their wares up for auction; dull-eyed slaves earn low bids. Corner-cutting at one of the major suppliers of these stimulants led to a number of slaves being prepared for auction being damaged today. Relatively few were permanently lost, but slaves are going to be a little scarce for a while, which will drive up the going rate. Projections suggest increases of up to five percent. There will be no immediate impact on you or your slaves, but the coming weeks will be a great time to sell stock, and a bad time to buy. <span class="noteworthy">The market price of slaves has increased.</span>`);
			V.menialSupplyFactor -= 12000;
		} else if (fluctuationType === "antislavery terrorism") {
			r.push(`Antislavery activism in the old world has grown to match the spread of slavery in the Free Cities. Unfortunately for the activists, they are confronted with a fundamental problem: the independence of the Free Cities. There is very little they can do without resorting to violence, and so, predictably, they often do. A major slave induction center in one of the more open Free Cities has just suffered a suicide bombing. The actual damage was slight, but a wave of increased import security is sweeping the Free Cities in reaction to the incident. Slave prices will be driven up by the cost of checking imported merchandise for explosive devices until the market adjusts. Projections suggest price increases of up to five percent. There will be no immediate impact on you or your slaves, but the coming weeks will be a great time to sell stock, and a bad time to buy. <span class="noteworthy">The market price of slaves has increased.</span>`);
			V.menialSupplyFactor -= 12000;
		} else if (fluctuationType === "new free city") {
			r.push(`New Free Cities arise unpredictably. They require either carving out a slice of the old world, emancipating it from whichever inattentive or corrupt country previously owned the land, or reclaiming new land from barren or uninhabitable areas, efforts which are often kept secret. The unpredictable happened today; the world has a new Free City. As usual, immigration rights are being offered cheaply to deserving persons. Many of the remaining rich and talented of the old world are staking claims in the new city, and they'll be buying slaves when they get to their new home. It's a sellers' market out there; projections show the price of slaves rising as much as ten percent in the short term. There will be no immediate impact on you or your slaves, but the coming weeks will be a great time to sell stock, and a bad time to buy. <span class="noteworthy">The market price of slaves has increased.</span>`);
			V.menialDemandFactor += 20000;
		} else if (fluctuationType === "speculation") {
			r.push(`The Free Cities are almost totally unregulated. Prices and interest rates can spike and plummet with speeds not seen since the South Sea Bubble, and for the most silly or corrupt of reasons. Today, it's the latter. A massive attempt to rig the slave market was uncovered this morning. Ultimately, the culprits were caught and much of the damage reversed, but confidence in the marketplace has been shaken. Many great slave vendors are holding onto their stock until they're sure the water's calm again. It's a sellers' market out there; projections show the price of slaves rising as much as ten percent in the short term. There will be no immediate impact on you or your slaves, but the coming weeks will be a great time to sell stock, and a bad time to buy. <span class="noteworthy">The market price of slaves has increased.</span>`);
			V.menialSupplyFactor -= 20000;
		} else if (fluctuationType === "medical breakthrough") {
			r.push(`There has been a breakthrough in gene therapy. More accurately, there was a breakthrough in gene therapy several years ago — you already knew all about it, and some of the more advanced slave medical upgrades available to you use the technology. However, it's finally gotten out of the prototype stage, and is becoming available to the Free Cities middle class, citizens with one or two slaves. The average citizen is more able today than he was yesterday to turn his chattel housekeeper into the girl he's always dreamed of. Aspirational stuff like this always causes a major price shock. It's a sellers' market out there; projections show the price of slaves rising as much as ten percent in the short term. There will be no immediate impact on you or your slaves, but the coming weeks will be a great time to sell stock, and a bad time to buy. <span class="noteworthy">The market price of slaves has increased.</span>`);
			V.menialDemandFactor += 20000;
		} else if (fluctuationType === "bankruptcy") {
			r.push(`The economy of the Free Cities is a rough-and-tumble place. The absence of old world regulations and institutions, and the often gold-rush atmosphere of the new cities, lead to fortunes being made and lost overnight. Last night, one of the Free Cities' greatest fortunes was lost. A great slave trading house unexpectedly went bankrupt, and its huge stable of slaves are being sold at fire-sale prices. The unforeseen sell off is driving down the market price of slaves all across the Free Cities. Projections show a short-term price drop of up to five percent. There will be no immediate impact on you or your slaves, but the coming weeks will be a fine time to buy new stock, and a terrible time to sell. <span class="noteworthy">The market price of slaves has dropped.</span>`);
			V.menialSupplyFactor += 12000;
		} else if (fluctuationType === "refugee boat") {
			r.push(`Periodic refugee crises sweep the old world, and sometimes the human flotsam shaken loose from its moorings in the old world is brought up on the shores of the Free Cities. This week, that was no metaphor. A floating Free City has been inundated by refugees in boats. Naturally, the boats have been discarded and the refugees enslaved. It is unclear whether they somehow did not know that this was their inevitable fate, or their lot in the old world was so desperate that they were willing to accept it. Projections show a short-term slave price drop of up to five percent as the market digests the influx. There will be no immediate impact on you or your slaves, but the coming weeks will be a fine time to buy new stock, and a terrible time to sell. <span class="noteworthy">The market price of slaves has dropped.</span>`);
			V.menialSupplyFactor += 12000;
		} else if (fluctuationType === "arcology change") {
			r.push(`All across the Free Cities, arcology owners are experimenting with new society models and new ways of enforcing them. A nearby arcology has just undergone a major internal struggle as its owner forced through a radical program of changes and harsh measures to enforce them. All but a handful of its inhabitants have been enslaved and placed under the control of a chosen few. With harems of hundreds and little experience or infrastructure to manage them, the new overlords are selling off stock to raise funds to make the transition. Projections show a short-term price drop of up to five percent as they flood the market with mediocre slaves. There will be no immediate impact on you or your slaves, but the coming weeks will be a fine time to buy new stock, and a terrible time to sell. <span class="noteworthy">The market price of slaves has dropped.</span>`);
			V.menialSupplyFactor += 12000;
		} else if (fluctuationType === "war") {
			r.push(`The old world outside the Free Cities took another step towards its final decline today. A relatively prosperous third world city fell to a regional warlord, and it seems the remaining great powers lack either the money or the will to do anything about it. The victors seem to be following the standard procedure for modern conquerors. Anything valuable, they steal. Among the population, they recruit the willing, shoot the unwilling, and enslave everyone else. The slave markets are going to be glutted with new stock soon. Projections show a short-term price drop of up to ten percent. There will be no immediate impact on you or your slaves, but the coming weeks will be a fine time to buy new stock, and a terrible time to sell. <span class="noteworthy">The market price of slaves has dropped.</span>`);
			V.menialSupplyFactor += 20000;
		} else if (fluctuationType === "empty prisons") {
			r.push(`A small, impoverished old world country defaulted on its currency today. Its beleaguered government is taking every available step to raise funds. Among other things, it has sold every inmate in its prisons who would fetch a price worth the trouble of sale into Free Cities slavery. Though most of the influx is going to be of abominably low quality, the sudden addition of so much new meat is going to have a big impact on the slave economy. Projections show a short-term price drop of up to ten percent. There will be no immediate impact on you or your slaves, but the coming weeks will be a fine time to buy new stock, and a terrible time to sell. <span class="noteworthy">The market price of slaves has dropped.</span>`);
			V.menialSupplyFactor += 20000;
		} else if (fluctuationType === "unemployment") {
			r.push(`A leading old world nation has just suffered a major economic downturn. Old world nations suffer economic downturns all the time, of course, but to those with interests in the slave market, news like this can be very important. Slave market shocks from catastrophes get all the headlines, but a change that affects millions will often be more impactful. As unemployment in the old world rises, the number of people faced with the choice between starvation and voluntary enslavement rises. Social safety nets just aren't what they used to be. Projections show a short-term slave price drop of up to ten percent due to the sharp increase in desperate people immigrating to the Free Cities for enslavement. There will be no immediate impact on you or your slaves, but the coming weeks will be a fine time to buy new stock, and a terrible time to sell. <span class="noteworthy">The market price of slaves has dropped.</span>`);
			V.menialSupplyFactor += 20000;
		} else if (fluctuationType === "anti-slavery coup") {
			r.push(`For months there were strong indications that an old world nation was quietly taking steps towards legalizing slavery. The market began to anticipate a serious increase in the demand for slaves in earnest but this week a month of protests against the country's leaders ended in a violent coup. The new government, claiming to only follow the will of the people, has made several promises, including a very vocal rebuke of even the slightest possibility of legal slavery within their borders. The slave market was shocked to find the previous government to be so weak and even more shocked at how unwilling the new one is to accept the times we live in. The panicked market quickly adjusted to greatly lowered slave demand and projections show a short-term price drop of up to ten percent. There will be no immediate impact on you or your slaves, but the coming weeks will be a fine time to buy new stock, and a terrible time to sell. <span class="noteworthy">The market price of slaves has dropped.</span>`);
			V.menialDemandFactor -= 20000;
		} else if (fluctuationType === "hostilities ended") {
			r.push(`The Free Cities make a real effort to avoid armed conflict, especially amongst themselves, as such endeavors almost never have any real winners. But tensions grew so high in their trade conflict that the likelihood of a full blown war between two Free Cities became not just a possibility but a near certainty for months. As skirmishes commenced and slave armies were quickly drilled for action on both sides, the slave market anticipated a boost to demand as soon as the fighting intensified. Miraculously, cooler heads prevailed and the Free Cities agreed to disband their armies. While many people sighed with relief the slave market was forced into a shock adjustment, projections show a short-term price drop of up to five percent. There will be no immediate impact on you or your slaves, but the coming weeks will be a fine time to buy new stock, and a terrible time to sell. <span class="noteworthy">The market price of slaves has dropped.</span>`);
			V.menialDemandFactor -= 12000;
		}
		V.menialDemandFactor = Math.clamp(V.menialDemandFactor, -50000, 50000);
		V.slaveCostFactor = menialSlaveCost()/1000;
		App.Events.addParagraph(node, r);
	}
};
