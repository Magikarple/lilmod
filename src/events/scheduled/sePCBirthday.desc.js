// cSpell:ignore finalé, snes

/** Handles the case where this file loads before the primary pcBirthday file. */
App.Events.pcBirthday = App.Events.pcBirthday || {};

/**
 * Handles most of the descriptive rendering of the PC Birthday event.
 */
App.Events.pcBirthday.Desc = (function(bday) {
	/**
	 * Creates a DocumentFragment with optional content.
	 * @param {string|Element} content
	 */
	function fragment(content = null) {
		const frag = document.createDocumentFragment();
		if (content) { $(frag).append(content); }
		return frag;
	}

	return {
		/**
		 * Entry to the PC birthday scene.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderIntro: function(data) {
			switch (data.mood) {
				case "solemn":
					return this.renderMood_Solemn(data);
				default:
					return this.renderMood_Happy(data);
			}
		},
		/**
		 * Top-level scene selection for a "solemn" mood.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderMood_Solemn: function(data) {
			let html = `
			<p>
				Running a Free City takes a certain fortitude. It's constant work, oftentimes thankless, and – in the worst of times – terribly stressful.
				This morning, as you stand at the balcony, looking across the ${App.Events.pcBirthday.scapeType(V.terrain)} around you, you find yourself reflecting on a year of hard
				decisions and humbling outcomes. You are stalwart and resolute, however. This arcology, if not the world, is still yours to shape.
			</p>
			<p>
				You walk inside and ${V.assistant.name} has a clipboard out, holding a pen to it as if ${data.assistPN.she} ever wrote anything down. "Happy birthday,"
				${data.assistPN.she} offers, trying to keep an official tone while letting a warmth envelope ${data.assistPN.his} words. ${data.assistPN.She} gives you an
				earnest smile.
			</p>`;

			const frag = fragment(html);

			App.Events.addResponses(
				frag,
				[
					new App.Events.Result("Engage in your business matters with focus and resolve", () => this.renderChoice_Business(data)),
					new App.Events.Result("Find a slave and spend the day relaxed and naked", () => this.renderChoice_Relaxed_Assistant(data)),
					new App.Events.Result(`Tell ${V.assistant.name} to get things ready: today there's going to be a party!`, () => this.renderChoice_Party_Assistant(data))
				]
			);

			return frag;
		},
		/**
		 * Top-level scene selection for a "happy" mood (also default mood if the mood isn't supported).
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderMood_Happy: function(data) {
			let html = '';

			if (data.planner) {
				html += `
				<p>
					There's been a certain playful spirit in the air of your penthouse, although you've mostly ignored it as you've gone about your daily routines.
					A bit of an extra smile from some of your slaves, a more lilting tone from your ${data.planner.role} ${data.planner.slave.slaveName}'s evening reports,
					some suspicious but inconsequential movements out the corner of your eye. Sometimes a mood drifts through ${V.arcologies[0].name} and everyone is
					enchanted by it.
				</p>
				<p>
					This morning, as a `;

				if (V.PC.dick) {
					html += `mouth around your cock`;
				} else {
					html += `tongue inside your cunt`;
				}

				html += ` bids you hello, you find streamers and festive, sparkling decorations emerging from nooks
					and crannies of your bedroom that you forgot were even there. The letters spelling <em>"HAPPY BIRTHDAY"</em>, strung along the wall across from you,
					explain the subdued giggling you sometimes heard behind your back. Seeing you are now awake and aware, ${data.planner.slave.slaveName} prowls up your
					body, `;

				if (data.planner.slave.boobs > 100) {
					html += `${data.planner.pn.his} exposed nipples gliding delicately over your chest. `;
				} else if (data.planner.can.pen()) {
					html += `${data.planner.pn.his} engorged dick coming to a rest on your crotch. `;
				}

				html += `${data.planner.pn.She} brings ${data.planner.pn.his} mouth to your ear and whispers a soft and sensual <em>"Happy birthday, ${getWrittenTitle(data.planner.slave)}"</em>
					in your ear before nibbling your lobe.
				</p>
				<p>
					${data.planner.pn.She} sits up. "So", ${data.planner.pn.she} begins with a brusque but excited chirp, "I didn't know how you would feel today.
					<em>So</em>... I've got two options for you to choose from."
				</p>
				<p>
					You play coy and ask if she's serious.
				</p>
				<p>
					"Mm-hmm. If you are feeling particularly bold and" – ${data.planner.pn.she} strokes your ${App.Events.pcBirthday.pcGenitals()} – "frisky, there's a bit of
					entertainment that can be arranged. Sort of a social event, let's say. But. If maybe you wanted to take the day off and spend a little time in
					bed... I've got entertainment lined up for that also." This time ${data.planner.pn.she} strokes ${data.planner.pn.his}
					${data.planner.slave.vagina > -1 ? "pussy" : "cock"}.

					${data.planner.pn.She} explains that if you decline the social event, ${data.planner.pn.she} has a business partner of yours set up to attend in your
					stead; a favor to be repaid one day. And if you prefer to see what it's all about, there will be plenty of stiff-dicked attendees there to sate
					${data.planner.pn.her}, so there's no reason to feel obliged to stay put.
				</p>
				<p>
					"${properMaster()} will get ${getPronouns(V.PC).his} wish."
				</p>`;

				const frag = fragment(html);

				App.Events.addResponses(
					frag,
					[
						new App.Events.Result("See just exactly what, or who, will go down at this event", () => this.renderChoice_Party_Planner(data)),
						new App.Events.Result("Enjoy the gift already sitting on your bed", () => this.renderChoice_Relaxed_Planner(data))
					]
				);

				return frag;
			} else {
				html += `
				<p>
					Running a Free City takes a certain fortitude. It's constant work, oftentimes thankless, and – in the best of times – remarkably rewarding.
					This morning, as you stand at the balcony, looking across the ${App.Events.pcBirthday.scapeType(V.terrain)} around you, you find
					yourself reflecting on a year of tough decisions and surprising outcomes. You remain stalwart and resolute: this arcology, if not the world, is
					yours to shape.
				</p>
				<p>
					You walk inside and ${V.assistant.name} has a clipboard out, holding a pen to it as if ${data.assistPN.she} ever wrote anything down. "Happy birthday!"
					${data.assistPN.she} offers, trying to keep an official tone while letting a warmth envelope ${data.assistPN.his} words. ${data.assistPN.she}
					gives you a pleasant smile.
				</p>`;

				const frag = fragment(html);

				App.Events.addResponses(
					frag,
					[
						new App.Events.Result("Engage in your business matters with focus and resolve", () => this.renderChoice_Business(data)),
						new App.Events.Result("Find a slave and spend the day relaxed and naked", () => this.renderChoice_Relaxed_Assistant(data)),
						new App.Events.Result(`Tell ${V.assistant.name} to get things ready: today there's going to be a party!`, () => this.renderChoice_Party_Assistant(data))
					]
				);

				return frag;
			}
		},
		/**
		 * Context: PC decides on gettin' money before get gettin' honey.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderChoice_Business: function(data) {
			let html = `
			<p>
				A birthday can be celebrated in many ways, and today the occasion will be marked by attacking your business interests head-on and with aplomb!
				Once you sit down and start looking over spreadsheets and market reports, ${V.assistant.name} notices your drive and feeds off your energy.
				${data.assistPN.she} serves you charts and figures as fast as you can zip through them.`;

			if (V.assistant.personality) {
				html += `At one point you hear a soft murmur, and look over to see a rosy glow in ${data.assistPN.his} cheeks.`;
			} else {
				html += `${data.assistPN.she} remarks on your speed. "${properTitle()}, you seem quite determined today. My circuits are radiating a very pleasant heat trying
				to keep up."`;
			}

			html += `</p>`;

			if (V.assistant.personality) {
				html += `
				<p>
					You ask your virtual assistant if this is turning ${data.assistPN.her} on.
				</p>
				<p>
					"No," ${data.assistPN.she} says quietly, ${data.assistPN.his} eyes darting away for a moment.
				</p>
				<p>
					When you look back down at your screen, you find a trio of beautiful, curvaceous slaves, fumbling over each other in a hedonistic pile. "...Maybe," you
					hear ${data.assistPN.her} clarify.
				</p>
				${this.renderChoice_Business_AssistantVideo(data)}
				<p>
					You look over at ${V.assistant.name} again. "Happy birthday, ${properTitle()}. I spent all week rendering it. Now let's make some money!"
				</p>`;
			} else {
				html += `
				<p>
					You can't help but smile. It wasn't an inappropriate comment, but it was strangely empathetic. Maybe ${data.assistPN.she} is quietly running an emotion
					engine in the background. No matter; ${data.assistPN.she} has processor cycles to spare. You crack your knuckles and get back to work.
				</p>`;
			}

			html += `<p>
				The next day, as the figures come in, you are startled by the numbers. The funds you shifted and the stocks you traded show immediate signs of paying off.
				For the week, you see a <span class="cash inc">modest windfall from your strange mood.</span> You are ready for a year of success ahead.
			</p>`;

			App.Events.pcBirthday.moneyAward();

			/* END */
			return html;
		},
		/**
		 * Helper function for a mini-scene.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderChoice_Business_AssistantVideo: function(data) {
			let slaveDescSing = "woman";
			let slaveDescPlural = "women";

			// once switch statements get involved, writing in SC no longer sounds fun
			switch (V.assistant.appearance) {
				case "loli":
				case "preggololi":
					slaveDescSing = "young girl";
					slaveDescPlural = "young girls";
					break;
				case "fairy":
				case "pregnant fairy":
					slaveDescSing = "fairy";
					slaveDescPlural = "fairies";
					break;
				case "shemale":
					slaveDescSing = "shemale";
					slaveDescPlural = "shemales";
					break;
				case "imp":
				case "monstergirl":
				case "slimegirl":
					slaveDescSing = "monstergirl";
					slaveDescPlural = "monstergirls";
					break;
			}
			const genital1 = V.assistant.appearance === "shemale" ? "dick" : "cunt";
			const genital2 = V.assistant.appearance === "shemale" ? "cock" : "clit";

			let html =
			`<p>
				The three ${slaveDescPlural} glide over each from sweat, mouths gasping and suckling at any skin nearby, hands attacking swollen ${genital2}s,
				soft moans and purrs as their groins reciprocate an aggressive touch.`;

			const market = V.assistant.market;

			if (market && market.relationship === "incestuous") {
				html += ` As you look closer, you see that the three ${slaveDescPlural} bare a striking resemblance to each other.
				The same hair color, the same eyebrows, the same nose. As the clip goes on, you see that two are clearly twins and one is a younger ${data.marketPN.sister}.`;
			} else if (market && market.relationship === "nonconsensual") {
				html += ` As you look closer, you realize that one of the ${slaveDescPlural} isn't moving about as much. As bodies shift and restraddle each other
				you notice leather cuffs binding ${data.marketPN.his} wrists and ankles, and the occasional glimpse of chains keeping them restrained.`;
			}

			html += ` Two of the slaves each take a breast of the third in their mouths and clamp their lips down on the nipples.
				Both move a hand to the third's ${genital1}, rubbing and stroking vigorously.
				The effect is too strong for the hapless ${slaveDescSing} who feels nothing but a ceaseless attack on ${data.marketPN.his} ${genital1} and tits.
				${data.marketPN.His} hips tremble and buckle as a loud wail escapes ${data.marketPN.his} mouth. It's only then that one of ${data.marketPN.his} companions releases ${data.marketPN.his} tender nipple and locks
				their mouths together, the two ${slaveDescPlural} sharing a kiss as frenetic as the hands touching ${data.marketPN.his} ${genital2}.
			</p>`;
			return html;
		},
		/**
		 * Context: PC decides to relax during their birthday after given options basically presented by the assistant.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderChoice_Relaxed_Assistant: function(data) {
			let html = '';

			if (data.planner) {
				html += `
				<p>
					After thanking ${V.assistant.name} for ${data.assistPN.his} dedication, you head out of your office and are immediately taken aback by a festive display of
					colors and shapes. Standing before you and blowing a party horn, ${data.planner.slave.slaveName} is dressed in a snug and flattering teddy. "Surprise!"
				</p>
				<p>
					You don't know how ${data.planner.pn.she} did it. Certainly not on ${data.planner.pn.his} own, so ${data.planner.pn.she} must have enlisted some helpers. Nothing
					betrayed ${data.planner.pn.his} plans. Even thinking back you can't recall anything unusual. And how did ${data.planner.pn.she} set this up between last night
					and this morning, in near silence...? Your ${data.planner.role} is some sort of crazy
					${data.planner.slave.genes === "XY" ? "sorcerer" : "sorceress"}.
				</p>
				<p>
					${data.planner.pn.She} shimmies up to you and gives you a constricting hug. "Happy birthday, ${properMaster()}!" Without a moment to respond, ${data.planner.pn.his}
					tongue finds its way into your mouth, and prods your tongue to dance with it. It's hopeless; your arms pincer ${data.planner.pn.his} body and you stroke
					your hands along ${data.planner.pn.his} back.
				</p>`;
				if (V.assistant.personality) {
					html += `
					<p>
						Faintly, you hear ${V.assistant.name} behind you. "Aw. It's so sweet."
					</p>`;
				}
				html += `
				<p>
					${data.planner.slave.slaveName} breaks the kiss, takes your hand, and leads you over to a table. "So. What did you want to do today? Anything special?"
					${data.planner.pn.She} steps aside so you can see the tabletop. A little cupcake sits there, ${App.Events.pcBirthday.eyeColors()} like your eyes, with a charming little candle
					burning upon it.
				</p>
				<p>
					You almost forgot what you were about to do. Collecting your thoughts, you tell ${data.planner.slave.slaveName} that you were thinking about spending
					a calm, stress-free day here in the penthouse.
				</p>
				<p>
					"That" – ${data.planner.pn.she} playfully pokes at your side – "can be arranged." ${data.planner.pn.She} turns ${data.planner.pn.his} sight to the candle.
					"Make your wish! I hope it comes true!"
				</p>`;

				const frag = fragment(html);

				App.Events.addResponses(
					frag,
					[
						new App.Events.Result("Close your eyes and make a wish", () => {
							return `
							<p>
								With eyes closed and a deep breath, you extinguish the dancing flame. ${data.planner.slave.slaveName}
								${V.assistant.personality ? V.assistant.name + " applaud" : "applauds"}.
								As if using ${data.planner.pn.his} newfound sorcery, you barely know what's happening before you find yourself back in your elegant bedroom.
								Soft, orange glows flicker and paint your walls and cast languid shadows nearby. A hand-selected fusion of aromas hang in a thin cloud,
								streaming from a collection of incense sticks. You sit on your bed, legs forward and cradling ${data.planner.slave.slaveName}. ${data.planner.pn.His}
								back is to you, ${data.planner.pn.his} snug teddy laced together in the back with tasteful white bows. You slowly undo the first.
							</p>
							` + this.renderPlannerScene(data);
						})
					]
				);

				return frag;
			} else {
				/* TODO: (snes): add options, randomized? or fully randomize the slave? */

				html += `
				<p>
					After thanking ${V.assistant.name} for ${data.assistPN.his} dedication, you head out of your office and into an elevator. A stroll through your bustling
					arcology will be a terrific way to wake up your senses, get in touch with the common folk – through an appropriate layer of security, of
					course – and maybe spy a juicy piece of action.
				</p>
				<p>
					As a general rule, birthdays aren't major milestones in a Free City. This is in part because of the state of the outside world, and in part because the
					sun and moon are rarely visible enough to sense the passage of time. But days are still days, and years years, and today you've got a bit more pep in
					your step. You own a fucking <em>arcology</em>. People <em>live and work here</em>. They're around you right now, grabbing noodles and jogging off to a
					factory, or hopping in and out of the shopping district with clothes and toys. Every one of your citizens should be <em>proud</em> to
					${V.PC.dick ? "swallow your dick" : "suckle your clit"}.
					Especially that one right there. Sitting on a bench with a phone in one hand and a fashionably chic, black jacket and dark skirt hugging their body.
				</p>
				<p>
					Most Free Citizens don't engage in direct eye contact with you, out of a mix of respect and fear. This one, thinking her phone is camouflage for the
					direction she's actually looking, has her eyes locked away from its screen and on you. Her lashes are long and dark; her skin has a delicious, soft tan.
				</p>`;

				const frag = fragment(html);

				App.Events.addResponses(
					frag,
					[
						new App.Events.Result("Approach the girl on the bench", () => this.renderStrangerScene(data))
					]
				);

				return frag;
			}
		},
		/**
		 * Context: PC decides to have the assistant plan a party.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderChoice_Party_Assistant: function(data) {
			let html = `
			<p>
				${V.assistant.personality ? `"Aye aye, cap'n!"` : `"As you wish."`}
				Your assistant knows plenty about what you consider a successful ${V.arcologies[0].name} party. You leave the details up to ${data.assistPN.her}.
			</p>
			<p>
				It isn't long before ${V.assistant.name} shoots you a message with the details. All you have to do is be there, ${data.assistPN.she} says. You stand within your
				closet deciding what to wear.
			</p>`;

			const after = `
			<p>
				That night, you tell yourself to do something special for ${V.assistant.name}, just before you drift off to sleep from exhaustion in a pile of assorted
				slaves.
			</p>`;

			const frag = fragment(html);
			frag.append(this.renderPartyScene(data, after));

			return frag;
		},
		/**
		 * Context: PC decides to relax with the party planner after they give options.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderChoice_Relaxed_Planner: function(data) {
			let html = `
			<p>
				You pull ${data.planner.slave.slaveName} down beside you. You ask what's going to happen to this debauched gala ${data.planner.pn.she} was talking about.
			</p>
			<p>
				"Nothing really. You're still the guest of honor. It's just you... are about to get caught up in a poorly timed major business deal." ${data.planner.pn.She}
				waves ${data.planner.pn.his} hand in dismissal. "I've got a slave there who knows what to do if we don't show up. At worst we'll break even. At best you'll
				still have a favor or two to cash in. Don't worry about that anymore." ${data.planner.pn.She} sits up and turns ${data.planner.pn.his} back to you. "Worry about
				this." ${data.planner.pn.She} tugs at the first of several tasteful white bows that tie ${data.planner.pn.his} teddy together; ${data.planner.pn.she} pulls it
				undone and without speaking invites you to undo the rest.
			</p>`;

			html += this.renderPlannerScene(data);

			return html;
		},
		/**
		 * Context: PC decides to spend time with the party planner after given options by them.
		 * This can come about through at least two paths.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderChoice_Party_Planner: function(data) {
			let html = `
			<p>
				You tell ${data.planner.slave.slaveName} that you can't imagine ${data.planner.pn.she} set up some sort of kinky gala expecting that you would just
				cede it to some nameless aristocrat.
			</p>
			<p>
				${data.planner.pn.She} shrugs. "It would still be your party. You would have just... got held up in an unfortunate meeting." ${data.planner.pn.She} takes your
				hands and tugs you out of bed. "C'mon. You gotta find something to wear. Or not wear!"
			</p>`;

			const after = `
			<p>
				That night, you tell yourself to do something special for ${data.planner.slave.slaveName}, and stroke ${data.planner.pn.his} hair just before the two of
				you drift off to sleep from exhaustion in a pile of assorted slaves.
			</p>`;

			const frag = fragment(html);
			frag.append(this.renderPartyScene(data, after));

			return frag;
		},
		/**
		 * Context: entry to the planner scene.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPlannerScene: function(data) {
			const pn = data.planner.pn;

			let html = `
			<p>
				${pn.She} scoots ${pn.herself} closer to you, ${pn.his} ample butt cheeks tenuously grazing your ${App.Events.pcBirthday.pcGenitals({adj:1})}. You undo the second bow, easing the ribbon
				through a reinforced buttonhole, and lean in to tease ${pn.his} neck with your lips. ${pn.She} tremors as if from an electric jolt as they make
				contact with ${pn.his} skin. You begin the third bow.
			</p>
			<p>
				The teddy is soon loose and ${pn.she} wastes no time slipping it over ${pn.his} arms and tossing it to the edge of the bed. Taking ${pn.his} `;

			if (data.planner.slave.boobs < 400) {
				html += `petite but eager`;
			} else if (data.planner.slave.boobs > 1000) {
				html += `unnaturally hefty`;
			} else {
				html += `deliciously firm`;
			}

			html += ` tits in your hands, you can tell by a stroke of your thumbs across ${pn.his} attentive nipples that ${pn.she} would be ready to pounce if ${pn.she} weren't
				letting you control the pace. ${pn.She} jiggles ${pn.his} tush to tease your ${App.Events.pcBirthday.pcGenitals()}. "Birthday ${getPronouns(V.PC).boy}," ${pn.she} coos, "you
				know I have another gift for you." You admit to yourself that you're just as eager to open it.
			</p>`;

			if (data.planner.slave.vagina > -1) {
				html += `
				<p>
					Deftly you lay ${pn.her} upon the bed. You tug at ${pn.his} panties, and ${pn.his} hips instantly raise in the air. You slip the panties off, noting the
					alluring scent of ${pn.his} pussy mixing with the calming incense.
				</p>`;

				if (V.PC.dick) {
					html += this.renderPlannerScene_PCBones(data);
				} else if (data.planner.slave.dick) {
					html += this.renderPlannerScene_PCGetsBoned(data);
				} else {
					html += this.renderPlannerScene_Boneless(data);
				}
			} else {
				html += `
				<p>
					Deftly you lay ${pn.her} upon the bed. You tug at ${pn.his} boxers, and ${pn.his} hips instantly raise in the air. You slip the boxers off, noting the
					alluring musk of ${pn.his} manhood mixing with the calming incense.
				</p>`;

				if (V.PC.vagina > -1) {
					html += this.renderPlannerScene_PCGetsBoned(data);
				} else {
					html += this.renderPlannerScene_PCBonesDatAss(data);
				}
			}

			return html;
		},
		/**
		 * Context: variant of the planner scene; PC has a penis, planner has a vagina.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPlannerScene_PCBones: function(data) {
			const pn = data.planner.pn;

			let html = `
			<p>
				You slither on top of ${pn.her}, enjoying the friction of ${pn.his} skin as your cock drags across. You kiss your way from ${pn.his} tummy to ${pn.his}
				neck, slipping up through ${pn.his} breasts, until you reach the parted and plump flesh of ${pn.his} lips. The radiant warmth of ${pn.his} cunt excites
				your shaft. ${pn.His} pelvis pushes up against you, pleading for you to enter ${pn.her}. You grab ${pn.his} hand, bring it down to your virile dick, and
				clasp ${pn.his} fingers around it. A silent signal from your eyes, and ${pn.she} is guiding your tip between the lubricated lips of ${pn.his} pussy. `;

			if (data.planner.slave.vagina === 0) {
				html += `You make an initial push into ${pn.her}. There is a start in ${pn.his} eyes. A hesitance. But after a moment of holding ${pn.his} body stiff and
					still, ${pn.she} relaxes. Though your had forgotten in the heady spirit of making love to ${pn.her}, you realize now that you have given this day
					another moment of significance. <span class="virginity loss">${data.planner.slave.slaveName} lies beneath you, no longer a virgin.</span>
					Sensing your own hesitation, ${pn.his} hands clench your buttocks and push you down into ${pn.her}. In a soft and demure whisper, ${pn.she} says into
					your ear, "Don't stop."`;
				App.Events.pcBirthday.takeVirginity(data.planner.slave);
			}

			html += `${data.planner.slave.slaveName} clenches the muscles of ${pn.his} vagina, gripping and cradling your length, and with a gentle thrust you are fully
				inside ${pn.her}, the soft pillows of ${pn.his} labia kissing the skin of your crotch.
			</p>
			<p>
				You grind into your pretty ${data.planner.role}. Many short, deliberate thrusts engage the sharp senses of your delicate parts. The syncopation never
				breaks. You and ${pn.she} follow each other's motions. ${pn.She} brings ${pn.his} knees up and holds ${pn.his} feet in the air as you thrust into ${pn.her}.
				You bring attention to ${pn.his} tits every so often, nibbling and suckling at ${pn.his} adorable nipples.
			</p>
			<p>
				The rhythm grows stronger. Soon, with every thrust, ${pn.she} mouths a moan. ${pn.She} is no longer reserving the strength of ${pn.his} pussy muscles;
				${pn.she} is clamping down tight around you, displaying no intention of letting you slip out and leaving ${pn.her} unfilled. ${pn.His} legs have gripped
				you and locked you in place as well. The heft of ${pn.his} breath on your neck and the unsteady flick of ${pn.his} tongue along the rim of your ear
				proves that ${pn.she} is so entranced by the plundering of ${pn.his} ravenous canal that ${pn.she} can barely coordinate ${pn.his} body outside of the
				central action.
			</p>
			<p>
				The moans become audible, starting from a soft whimper and growing into a desperate cry for release. ${pn.She}'s working ${pn.his} hips with fierce
				urgency. ${pn.She}'ll be damned if ${pn.she} gets off without milking your dick for every fucking drop of cum that is ready to burst the dam. ${pn.She}
				won't let go now; ${pn.his} limbs have such a vice grip on your pounding body that you'd have little chance to shake loose even if you wanted. The
				${pn.girl} is wild. And hungry. And intense. And writhing. And –
			</p>
			<p>
				Brought to a crescendo, you release inside of ${pn.her}. An animalistic growl escapes ${pn.his} lips. ${pn.She} trembles underneath you, a series of
				shockwaves and aftershocks ripples across ${pn.his} frame. Through this, ${data.planner.slave.slaveName} hasn't let go. ${pn.His} pussy swallows your
				semen – gulps it down like a parched nomad. As the bursts subside and your own body relaxes, ${pn.his} muscles yield. It matters little, however.
				You're scared to move for fear of overstimulating your exhausted cock. You collapse atop ${pn.her}, and ${pn.she} nuzzles ${pn.his} nose into your neck
				before giving you a gentle kiss.
			</p>
			<p>
				"Happy birthday."
			</p>`;

			/* END */
			return html;
		},
		/**
		 * Context: variant of the planner scene; PC has a vagina, planner has a vagina.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPlannerScene_Boneless: function(data) {
			const pn = data.planner.pn;

			let html = `
			<p>
				You slither on top of ${pn.her}, enjoying the friction of ${pn.his} skin against your pussy lips. You kiss your way from ${pn.his} tummy to ${pn.his} neck,
				slipping up through ${pn.his} breasts, until you reach the parted and plump flesh of ${pn.his} lips. The radiant warmth of ${pn.his} cunt heats your
				thigh. ${pn.His} pelvis pushes up against you, pleading for your caress and attention. You reach down between your bodies and find the
				soft mound between ${pn.his} legs. ${pn.His} slit allows a finger inside, and you find ${pn.his} attentive button swimming in ${pn.his} juices. ${pn.She}
				mirrors your actions, and soon two fingers are straddling your clit, stroking it and occasionally slipping down to the opening of your impatient
				canal. As you lie together, your bodies slowly swaying, you position your nipples to dance together and jostle each other.
				${data.planner.slave.slaveName}'s leg pets your thigh and calf. You finally roll onto your sides, allowing for an easier exploration of each other's
				nethers.
			</p>
			<p>
				You grind and rub your pretty ${data.planner.role}. Many short, deliberate strokes engage the sharp senses of your delicate parts. The syncopation
				never breaks. You and ${pn.she} follow each other's motions. ${pn.His} fingers plunge into your awaiting cunt, ${pn.his} fingertips gently swabbing its
				walls. You bring attention to each other's tits every so often, nibbling and suckling at their nipples.
			</p>
			<p>
				The rhythm grows stronger. Soon, with every thrust, ${pn.she} mouths a moan. In desperation ${pn.she} grabs your thigh and pulls it hard to the moist
				lips of ${pn.his} pussy then grinds up against it. ${pn.His} own leg bares against your crotch and the sways of ${pn.his} hips stimulates your sensitive
				clit. Your hand goes to ${pn.his} ass and ${pn.hers} to yours; kneading, pulling, pleading to increase the pressure and friction of legs against
				pussies. Your bodies swivel in offset synchronicity, two pistons churning to drive a heated engine. The heft of ${pn.his} breath on your neck and the
				unsteady flick of ${pn.his} tongue along the rim of your ear proves that ${pn.she} is so entranced by the buffing of ${pn.his} flush labia that ${pn.she}
				can barely coordinate ${pn.his} body outside of the central action.
			</p>
			<p>
				The moans become audible, starting from a soft whimper and growing into a desperate cry for release. ${pn.She}'s working ${pn.his} hips with fierce
				urgency. ${pn.She}'ll be damned if ${pn.she} gets off without leaving you quivering in ecstasy from an assault on your clit. ${pn.She} breaks
				the rhythm just long enough to lift ${pn.his} body up and bring the leg ${pn.she} was humping you with fully to the other side of your body. In position
				now, ${pn.his} pussy is planted firmly against yours, the direct mingling of your wetness sealing the kiss of your private lips.
				${data.planner.slave.slaveName} bucks ${pn.his} hips and presses firmly down into you and the cadence quickly returns. ${pn.His} hands absently grope and
				caress your body. ${pn.His} thrusts drive harder into you but the sticky friction of ${pn.his} groin against your clitoris never lets up. The ${pn.girl}
				is wild. And hungry. And intense. And writhing. And –
			</p>
			<p>
				Brought to a crescendo, you come spastically against each other. An animalistic growl escapes ${pn.his} lips. ${pn.She} trembles between your legs, a
				series of shockwaves and aftershocks ripples across ${pn.his} frame. Through this, ${data.planner.slave.slaveName} hasn't let go. ${pn.His} legs clamp you
				tightly and ${pn.his} arm keeps your leg locked against ${pn.her}. As the bursts subside and your own body relaxes, ${pn.his} muscles yield. It matters
				little, however. You're scared to move for fear of overstimulating your exhausted pussy. You collapse into one another, and ${pn.she} nuzzles ${pn.his}
				nose into your neck before giving you a gentle kiss.
			</p>
			<p>
				"Happy birthday."
			</p>`;

			/* END */
			return html;
		},
		/**
		 * Context: variant of the planner scene; PC has a penis, planner has a penis.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPlannerScene_PCBonesDatAss: function(data) {
			const pn = data.planner.pn;

			let html = `
			<p>
				You slither on top of ${pn.her}, enjoying the friction of ${pn.his} skin as your cock drags across. You kiss your way from ${pn.his} tummy to ${pn.his}
				neck, slipping up through ${pn.his} breasts, until you reach the parted and plump flesh of ${pn.his} lips. The radiant warmth of ${pn.his} cock heats
				your groin. ${pn.His} pelvis pushes up against you, pleading for your touch. ${pn.She} shifts you onto the bed at ${pn.his} side then rolls his back
				toward you. ${pn.She} keeps ${pn.his} head turned and eyes locked to yours. ${pn.She} reaches back and grabs your hand, brings it down to your virile
				dick, and clasps your fingers around it. A silent signal from your eyes, and ${pn.she} is guiding your tip between the puckered and greased
				entrance of ${pn.his} ass. ${pn.She} lets go and trusts you to complete the task. ${data.planner.slave.slaveName} relaxes the anticipating muscles of
				${pn.his} sphincter, accepting the length of your shaft within. The warm recesses of ${pn.his} anus convulse, gripping and cradling your penis, and
				with a gentle thrust you are fully inside ${pn.her}, the soft pillows of ${pn.his} buttocks kissing the skin of your waist. You lie your arm over
				${pn.his} side and delicately grasp ${pn.his} excited cock. Your thumb traces the contours of its tip.
			</p>
			<p>
				You grind into your pretty ${data.planner.role}. Many short, deliberate thrusts engage the sharp senses of your delicate parts. The syncopation never
				breaks. You and ${pn.she} follow each other's motions. ${pn.She} reaches an arm behind ${pn.her} and slips ${pn.his} hand down to your butt cheek and grasps
				it firmly. For each thrust you drive into ${pn.her}, you stroke your hand down to the base of ${pn.his} shaft, and on each retreat your hand pumps back
				to its tip.
			</p>
			<p>
				The rhythm grows stronger. Soon, with every thrust, ${pn.she} mouths a moan. ${pn.She} is no longer reserving the strength of ${pn.his} ass muscles;
				${pn.she} is clamping down tight around you, displaying no intention of letting you slip out and leaving ${pn.her} unfilled.
				${pn.His} hand clasps you tight and demands you keep close as it kneads your ass. The heft of ${pn.his} breath on your neck and the unsteady flick
				of ${pn.his} tongue along the rim of your ear proves that ${pn.she} is so entranced by the plundering of ${pn.his} ravenous canal that
				${pn.she} can barely coordinate ${pn.his} body outside of the central action.
			</p>
			<p>
				The moans become audible, starting from a soft whimper and growing into a desperate cry for release. ${pn.She}'s working ${pn.his} hips with fierce
				urgency. ${pn.She}'ll be damned if ${pn.she} gets off without milking your dick for every fucking drop of cum that is ready to burst the dam. ${pn.His}
				hips buck just as insatiably as yours. ${pn.She} releases your buttock only to reach down and pull your thigh over ${pn.his} hip. ${pn.She} rolls forward
				enough to give you more leverage into ${pn.his} devouring asshole. ${pn.She} arches ${pn.his} back and begs you to pump ${pn.her} harder. The ${pn.girl} is
				wild. And hungry. And intense. And writhing. And –
			</p>
			<p>
				Brought to a crescendo, you release inside of ${pn.her} and ${pn.she} onto the cotton sheets. An animalistic growl escapes ${pn.his} lips. ${pn.She}
				trembles underneath you, a series of shockwaves and aftershocks ripples across ${pn.his} frame. Through this, ${data.planner.slave.slaveName} hasn't let
				go. ${pn.His} ass swallows your semen; gulps it down like a parched nomad. As the bursts subside and your own body relaxes, ${pn.his} muscles yield.
				It matters little, however. You're scared to move for fear of overstimulating your exhausted cocks. You collapse atop ${pn.her}, and nuzzle your nose
				into ${pn.his} neck before giving ${pn.her} a gentle kiss. ${pn.She} looks back at you with a smile.
			</p>
			<p>
				"Happy birthday."
			</p>`;

			/* END */
			return html;
		},
		/**
		 * Context: a one-on-one branch in which the PC has a woo-woo and the slave has a pee-pee.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPlannerScene_PCGetsBoned: function(data) {
			const pn = data.planner.pn;

			let html = `
			<p>
				You slither on top of ${pn.her}, enjoying the friction of ${pn.his} thigh as your pussy slides across. You kiss your way from ${pn.his} tummy to ${pn.his} neck,
				slipping up through ${pn.his} breasts, until you reach the parted and plump flesh of ${pn.his} lips. The radiant warmth of ${pn.his} cock excites your cunt.
				${pn.His} pelvis pushes up against you, pleading to enter you. You playfully roll ${pn.her} over, switching places until ${pn.she} is bearing down upon you. You
				reach down to ${pn.his} virile dick, and clasp your fingers around it. A silent signal from ${pn.his} eyes, and you are guiding ${pn.his} tip between the lubricated
				lips of your pussy. You clench the muscles of your vagina, gripping and cradling ${pn.his} length, and with a gentle thrust ${pn.she} is fully inside you, the
				soft pillows of your labia kissing the skin of ${pn.his} crotch.
			</p>
			<p>
				You grind against your pretty ${data.planner.role}. Many short, deliberate thrusts engage the sharp senses of your delicate parts. The syncopation never breaks.
				You and ${pn.she} follow each other's motions. You bring your knees up and hold your feet in the air as ${pn.she} thrusts into you. You bring attention to
				${pn.his} tits every so often, nibbling and suckling at ${pn.his} adorable nipples.
			</p>
			<p>
				The rhythm grows stronger. Soon, with every thrust, ${pn.she} mouths a moan. ${pn.She} is no longer reserving the strength of ${pn.his} ab muscles; ${pn.she} is
				pounding down rough into you, displaying no intention of letting ${pn.himself} slip out and leaving you unfilled. Your legs have gripped ${pn.her} and locked
				${pn.her} in place as well. The heft of ${pn.his} breath on your neck and the unsteady flick of ${pn.his} tongue along the rim of your ear proves that ${pn.she} is
				so entranced by the plundering of your pussy with ${pn.his} substantial cock that ${pn.she} can barely coordinate ${pn.his} body outside of the central action.
			</p>
			<p>
				The moans become audible, starting from a soft whimper and growing into a desperate cry for release. ${pn.She}'s working ${pn.his} hips with fierce urgency.
				${pn.She}'ll be damned if ${pn.she} gets off without working ${pn.his} engorged tool against every sensitive spot inside you. You won't let go now; your limbs have
				such a vice grip on ${pn.his} pounding body that ${pn.she}'d have little chance to shake loose even if ${pn.she} wanted. The ${pn.girl} is wild. And hungry. And
				intense. And writhing. And –
			</p>
			<p>
				Brought to a crescendo, ${pn.she} releases inside of you. An animalistic growl escapes ${pn.his} lips. ${pn.She} trembles above you, a series of shockwaves and
				aftershocks ripples across ${pn.his} frame. Through this, ${data.planner.slave.slaveName} hasn't let go. ${pn.His} stiff phallus lies unloaded inside you. As the
				bursts subside and your own body relaxes, ${pn.his} muscles yield. It matters little, however. You're scared to move for fear of overstimulating your
				exhausted pussy. ${pn.She} collapses atop you, and ${pn.she} nuzzles ${pn.his} nose into your neck before giving you a gentle kiss.
			</p>
			<p>
				"Happy birthday."
			</p>`;

			/* END */
			return html;
		},
		/**
		 * Context: PC decides to party down; this may be set up by either the assistant or the party planner.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPartyScene: function(data, afterParty = null) {
			const frag = fragment();

			App.Events.addResponses(
				frag,
				[
					new App.Events.Result("Formal attire, to present a leader of style and authority", () => {
						data.attire = "formal";
						return `
						<p>You spend a few minutes fitting yourself into a stylish three-piece, finish the looking with a proper bow tie.</p>
						` + this.renderPartyScene_Arrival(data) + afterParty;
					}),
					new App.Events.Result("Something fun and spunky; when you said party, you meant it", () => {
						data.attire = "casual";
						return `
						<p>You find something that broadcasts exactly what you want from this party: a raunchy, good time.</p>
						` + this.renderPartyScene_Arrival(data) + afterParty;
					}),
					new App.Events.Result(`The birthday ${getPronouns(V.PC).boy} will wear a birthday suit`, () => {
						data.attire = "naked";
						return `
						<p>There's no need to waste time – and cleaning costs – putting on clothes that are just going to come off again.</p>
						` + this.renderPartyScene_Arrival(data) + afterParty;
					}),
				]
			);

			return frag;
		},
		/**
		 * Context: PC chose their attire in the "choose attire" scene.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPartyScene_Arrival: function(data) {
			let html = `
			<p>
				Approaching the multi-purpose conference room, you can hear `;

			switch (data.attire) {
				case "formal":
					html += `a soft, classical arrangement playing over the quiet murmurs of an awaiting crowd.`;
					break;
				case "casual":
					html += `the raucous, loud beats of a dance music set, mostly drowning out the hyped noise of the crowd inside.`;
					break;
				case "naked":
					html += `a contemporary playlist, upbeat but superficial; perfect for an event where it's the people (and their bodies) that are the focus, not
					the <em>ambiance</em>.`;
					break;
			}

			html += ` Your faith in ${V.assistant.name} is renewed once again.
			</p>
			<p>
				You are about to pull open the door, but they swing open for you. "Ladies and gentlemen," ${V.assistant.name} announces over the speaker system, "the head
				of ${V.arcologies[0].name}, and our special birthday guest of honor, <em>${V.PC.slaveName}</em>!"
			</p>
			<p>
				You stroll in to the applause of an excited crowd of smiling faces. Business leaders, arms dealers, slave purveyors; it's a list of essential figures
				within your arcology. A quarter of them already have a slave between their legs, getting their cock swallowed or their pussy tongue-polished. The rest
				are swiping drinks or stims off of trays that glide by and are eyeing the available harem looking for just the right body. Unoccupied slaves swirl about
				the room, introducing themselves and their bodies to the guests.
			</p>
			<p>
				You spend a few requisite minutes hobnobbing with the elites while getting your own buzz going. You get extra attention from the unclaimed slaves;
				there's hardly a moment when a stray hand isn't caressing your ${App.Events.pcBirthday.pcGenitals()}. You begin to wonder if anything was even planned for the
				party beyond music and sluts, but before you can grouse about it, the lights dim and a spotlight beams down onto an empty area in the center of the
				room. Two slaves roll a leather recliner into the light as two more take your arms and chaperone you over to it. On your way over you notice a mist
				billowing up from cleverly hidden fog machines, which you find a touch over-dramatic but approve of nonetheless.`;

			if (data.attire !== "naked") {
				html += `Before you are prompted to sit, your clothes are summarily dismissed from your body in a frenzy of precision that would
				make a motorway pitstop envious.`;
			} else {
				html += `Your bare body is given a quick caress from a flurry of hands as you are invited to sit.`;
			}

			html += `
			</p>`;

			if (V.PC.dick) {
				html += this.renderPartyScene_PCBones(data);
			} else {
				html += this.renderPartyScene_PCGetsBoned(data);
			}

			App.Events.pcBirthday.partyAward(data);

			return html;
		},
		/**
		 * Context: variant of the party scene in which the PC has a penis.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPartyScene_PCBones: function(data) {
			let html = `
			<p>
				Swaying her plump ass to the rhythm pulsing in the room, a first slave, with a dark and richly warm skin tone, sambas over to you. In repeated
				sequence, she flourishes her butt for the crowd in one direction, pivots her body 180&deg; toward you, and shimmies for the crowd on the other side.
				Now in front of you, she brings her taut cheeks down on your dick, which is lying stiff but ready on your lap. She works the cleavage of her ass
				along its length, a mild oil giving a pleasant stride for each pump of her waist. She starts to move her hips in a circle and brings her booty far
				enough back that her warm cunt kisses your cock. She pulls her whole body onto your chair, setting her lower legs down in its seat, straddling your
				lap, and reaches behind her to grab your shaft. Lowering her body down, she passes your penis between her thighs. You still feel the juices of her
				pussy mingling with the oil now coating your dick. Now that you are held in the clenched triangle between her legs, she returns to her signature
				shake. The sway of her buttocks causes them to jiggle counter to the motions. The precise control of her abs keeps her waist moving in time while
				her upper body is almost perfectly locked in place. Her hands caress her tits and tweak her nipples while her thighs pump themselves along your
				cock.
			</p>
			<p>
				Her thigh muscles glide back and forth against you, and gently roll your dick against her pussy lips. Between short, quick, repetitive gyrations,
				she works long and forceful strokes into her routine, keeping the sensation on your dick fresh and exciting. The onlookers applaud to the rhythm of
				her dancing; on each clap you see her butt thrust back at you. You are tempted to clasp the firm semi-globes but are loathe to ruin her act. She
				is able to control the tempo of the applause by adjusting her own rhythm, and subtly accelerates both. With a beckoning finger, she pulls another
				slave from the crowd. This second slave is petite and pale, her dark hair held back in a tight bun. She brings her naked body up to meet the girl
				thigh-fucking you, taking her lips from the dancer's stomach up to her mouth, where they briefly exchange saliva.
			</p>
			<p>
				Suddenly the smaller girl leaps and the first slave, an obvious partner now or in the past, lifts her upward with the assistance of momentum. This
				new girl hurdles over the darker one in your lap by momentarily planting hands on her shoulders. The oiled partner never takes her hands away from
				the gymnast's body, who has soon anchored her hands to the arms of your recliner. This motion, never broken, is so swift and dramatic that you don't
				even notice when the thighs swaddling your cock pull away, and the woman once in your lap has now been exchanged with a small, sinewy one, whose
				back is upside-down and facing you. The dancer now holds your cock upright and steady in her hand, however, as the lithe girl bends at her elbows,
				lowering herself down, mouth open, until the full length of your shaft has slid against her tongue and started into her throat. She contorts and
				brings her legs toward you, each slipping by either side of your head until your nose is planted on the delicate wisp of hair above her labia. Her
				partner shimmies away back into the crowd, and they clap along until she has left the misty spotlight. The girl now serving you engages every oral
				muscle in her control to milk your cock, and she jostles her pussy against your face, until you understand that it is being offered to you.
				Instinctively your hands go to her hips and you eat the limber lass out, working your tongue into and around the warm, juicy folds of her labia.
				At no point has she stopped attending to your dick, gently bobbing her head, your tip worked against the soft palate at the entrance of her throat.
				The crowd loves the spectacle, hushed as she moves into a new position, then applauding. They watch the bulge moving like a slow piston along her neck.
				At irregular intervals she extends her arms fully, bringing your tip back out to her lips where she teases and suckles it before settling it back
				inside her mouth. Just from holding her, you can feel her vaginal muscles reacting to your attack on her clit.
			</p>
			<p>
				She tightens her legs against your head and bends her knees over the head of the chair. You feel her shifting her weight against you as she
				unsheathes your stiff member from her oral cavity. With uncanny abdominal strength, she coils herself up and over you, spreads her legs to give her
				hands room to find purchase on your shoulders, then brings her weight down upon you there. She is so light that this registers as little more than
				a slight pressure. She's free to extend her legs almost fully outward. In an unexpected burst of energy, she twirls around your head as she uses you
				like a pommel horse; her face stops before yours just long enough to plant a finalé kiss on your cheek, and she disappears somewhere behind you.
			</p>
			<p>
				As her body launched out of sight, however, another two bodies were waiting at your feet. Or – you begin to wonder if it is actually two, or
				if your vision is doubling from a random pill you pulled off a tray and the mystical atmosphere provided by the fog. But no, it's soon clear that
				it's two redhead twins who had been warming each other up to prepare themselves for you. In stark and provocative contrast to the athlete before
				them, these girls slide upon you with full, soft bodies. They kiss your nipples, your collarbone, your cheeks, and finally share your tongue
				between them. You believe you sense something peculiar happening around you, but it's not yet clear what. A hand clasps your rod and jerks it
				gently. The gymnast did a tremendous job cleaning your dick of the oil and taste of the fat-bottomed dancer before her, but it remains lubricated
				with her saliva.
			</p>
			<p>
				One of the twins pulls her body atop of yours, her ass planted snuggly against your member. She twists her body around and returns to prodding your
				mouth with her tongue as her sister suckles at her tits. The standing twin then walks around to position herself between your legs. Meanwhile, the
				girl atop you lifts her tush up and guides the tip of your penis against her puckered asshole. She relaxes, and next her sphincter welcomes your
				visiting penis inside her warm anus. She settles down carefully atop you; as each inch sinks in, her muscles choke your throbbing cock until it is
				fully inside her. The other twin, meanwhile, is preparing for her own entry. The strange sensation you noticed previously is now clearly visible;
				the girl's meaty cock is poised at the lips of her sister's pussy. They clasp their bodies together and, with a tender kiss, they are now joined at
				the waist. You feel the hermaphroditic twin's member entering the canal neighboring your own tight enclosure.
			</p>
			<p>
				A slow pulsation follows. The girl sandwiched between you and her twin lover drifts back and forth, savoring the length of two rigid cocks inside
				her. The muscles around her anal walls clench and release. A counter but complementary motion from the upright twin augments the sensation.
				${this.renderPartyScene_NoiseBlurb(data)}
			</p>
			<p>
				The cadence grows faster as the plush ass on your lap pulls itself off you farther and pushes down onto you harder. She clasps your hands around
				her bountiful breasts and invites you to squeeze them and pull at their nipples. The twin hammering her sister has little control over her own tits,
				which sway, jostle, and jiggle with every thrust. The arch of the standing twin's back has slowly been lowering, bringing her dangling boobs closer
				to the receiving sister's body. They understand each other's rhythms intrinsically and psychically, and they feel each other building to climax.
				Just the same it seems as if they are able to synchronize to your own restrained thrusts, and have orchestrated their actions to bring you to
				climax with them. The middle slave's bare buttocks are fucking against you hard now, as the two sisters pull in and hold each other's body close.
				You slide your hands from the girl's tits to her waist and help steady her against your aching cock.
			</p>
			<p>
				With her decisive, final lunges, her gripping tunnels bring both pricks inside her to release. You fill her sweat-drenched ass with your seed,
				every subsequent pump of her hips milking out another load. The twins celebrate by feeding their plump teats to each other. Once the two cocks are
				emptied, the twins pull themselves apart and return to the position where they started: flanking you and dancing their tongues over yours and each
				other's.
			</p>`;

			return html;
		},
		/**
		 * Context: variant of the party scene in which the PC has a vagina and no penis.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPartyScene_PCGetsBoned: function(data) {
			let html = `
			<p>
				The chair seems specially purposed, sporting an inward scoop along the front that keeps your tush firmly near the edge but with enough surface under
				your legs to keep you from sliding off. You relax into the chair as a first slave, with a dark and richly warm skin tone, sways her plump ass to the
				rhythm pulsing in the room and sambas over to you. In repeated sequence, she flourishes her butt for the crowd in one direction, pivots her body
				180&deg; toward you, and shimmies for the crowd on the other side. Now in front of you, she brings her taut cheeks down on your crotch, where your
				pussy lies moist and ready. She turns her body around, presenting an impossibly girthy dong standing at attention before her. She works the length of
				her shaft against your pussy lips, a mild oil giving a pleasant stride for each pump of her waist. She takes your legs and brings them together in
				front of her. She presses your thighs tight together around her dick as she continues to grind its mass against the lips of your lubricated vulva.
				An attendant slave – one of the two that brought you over to the chair – places an angled cushion before the belly-dancing slave fucking
				your thighs. She kneels upon it, finding a good posture to return to her signature shake. The sway of her buttocks causes them to jiggle counter to
				the motions. The precise control of her abs keeps her waist moving in time while her upper body is almost perfectly locked in place. Her hands
				alternate between holding and caressing your thighs while she pumps her cock between them.
			</p>
			<p>
				Between short, quick, repetitive gyrations, she works long and forceful strokes into her routine, keeping the sensation on your cunt fresh and
				exciting. On long strokes she pulls her shaft back far enough for its tip to kiss your throbbing clit for just a moment until the length of the
				shaft grinds against it. The onlookers applaud to the rhythm of her dancing; on each clap you see her hips thrust back at you. She is able to
				control the tempo of the applause by adjusting her own rhythm, and subtly accelerates both. With a beckoning finger, she pulls another slave from
				the crowd. This second slave is petite, her dark hair held back in a tight bun. She brings her naked body up to meet the girl you are
				thigh-fucking, taking her lips from the small of the dancer's back up to the nape of her neck.
			</p>
			<p>
				Suddenly the smaller girl leaps and the first slave, an obvious partner now or in the past, lifts her upward with the assistance of momentum. This
				new girl hurdles over the darker one in front of you by momentarily planting hands on her shoulders and twisting herself around. The oiled partner
				almost never takes her hands away from the gymnast's body, who has soon anchored her hands to the arms of your recliner. This motion, never broken, is so
				swift and dramatic that you don't even notice when the meaty cock that your thighs were swaddling pulls away, and the woman once fucking you has now
				been exchanged with a small, sinewy one, whose dainty, perky tits are upside-down and facing you. The dancer now holds your thighs apart, however,
				as the lithe girl bends at her elbows, lowering herself down, mouth open, until she seals her pouty lips around the opening between your legs. She
				contorts and brings her legs toward you, each slipping by either side of your head until your nose is planted on the delicate strip of skin between
				her pussy and asshole. Her partner shimmies away back into the crowd, and they clap along until she has left the misty spotlight. The girl now
				serving you engages every oral muscle in her control to suckle and prod your cunt, and she jostles her pussy against your face, until you understand
				that it is being offered to you. Instinctively your hands go to her hips and you eat the limber lass out, working your tongue into and around the
				warm, juicy folds of her labia. At no point has she stopped attending to your mound, gently probing your vaginal walls and pinching her lips around
				your swollen clitoris. The crowd loves the spectacle, hushed as she moves into a new position, then applauding. Just from holding her, you can feel her
				vaginal muscles reacting to your attack on her clit.
			</p>
			<p>
				She pulls her head up and twists her body like a wrung towel then untwists in the opposite direction. Once she has finished her maneuver, she has
				flipped her whole body over, her nipples pointing up in the air. She tightens her legs against your head and bends her knees over the head of the
				chair. You feel her shifting her weight against you. With uncanny abdominal strength, she coils herself up and over you, spreads her legs to give
				her hands room to find purchase on your shoulders, then brings her weight down upon you there. She is so light that this registers as little more
				than a slight pressure. She's free to extend her legs almost fully outward. In an unexpected burst of energy, she twirls around your head as she uses
				you like a pommel horse; her face stops before yours just long enough to plant a finale kiss on your cheek, and she disappears somewhere behind you.
			</p>
			<p>
				As her body launched out of sight, however, another two bodies were waiting at your feet. Or – you begin to wonder if it is actually two, or
				if your vision is doubling from a random pill you pulled off a tray and the mystical atmosphere provided by the fog. But no, it's soon clear that
				it's two redhead twins who had been warming each other up to prepare themselves for you. In stark and provocative contrast to the athlete before
				them, these girls slide upon you with full, soft bodies. They kiss your nipples, your collarbone, your cheeks, and finally share your tongue between
				them. You believe you sense something peculiar happening around you, but it's not yet clear what. A hand clasps your vulva and strokes it gently.
			</p>
			<p>
				One of the twins pulls her body atop of yours, a stiff limb pressed snuggly against your waist. She returns to prodding your mouth with her tongue
				as her sister suckles at her own tits. The standing twin then walks around to position herself between your legs. Meanwhile, the girl atop you lifts
				her body and reaches down between your crotches. The strange sensation you noticed previously is now clear; the girl's meaty cock is
				poised at the lips of your pussy. Moreover, her sister's matching member is bearing down onto her ass. She guides the tip of her penis between the
				folds of your pussy, lubricating it with the wetness flowing out of you. She presses forward, the hooded end tunneling its way into the welcoming
				walls of your vagina. At the same time, the twin standing behind her has penetrating her curvaceous ass, causing the slave atop you to arc her back.
				As each inch of her enters you, your muscles choke her throbbing cock until it is nestled fully inside you. The twin atop you twists around to meet
				her sister with a tender kiss, and they are now joined below the waist. You can feel the secondary motion of the standing sister's thrusts informing
				the rhythm of the cock inside of you.
			</p>
			<p>
				A slow pulsation follows. The girl sandwiched between you and her twin lover drifts back and forth, savoring the dual sensations of penetrating and
				being penetrated. The muscles around her anal walls clench and release. A counter but complementary motion from the upright twin augments the
				sensation. ${this.renderPartyScene_NoiseBlurb(data)}
			</p>
			<p>
				The cadence grows faster as the unyielding phallus inside you pulls itself out farther and pushes into you harder. She clasps your hands around her
				bountiful breasts and invites you to squeeze them and pull at their nipples. She does the same in return. The twin hammering her sister from behind
				has little control over her own tits, which sway, jostle, and jiggle with every thrust. The arch of the standing twin's back has slowly been
				lowering, bringing her dangling boobs closer to the receiving sister's body. They understand each other's rhythms intrinsically and psychically,
				and they feel each other building to climax. Just the same it seems as if they are able to synchronize to your own restrained thrusts, and have
				orchestrated their actions to bring you to climax with them. The middle slave's hairless balls are slapping against you hard now, as the two sisters
				pull in and hold each other's body close. You slide your hands from the girl's tits to her waist and help steady her against your aching pussy.
			</p>
			<p>
				With her decisive, final lunges, two gripping tunnels bring the pricks inside them to release. She fills your sweat-drenched cunt with her seed,
				every subsequent pump of her hips milking out another load. The twins celebrate by kissing and fondling each other's bulbous tits. Once the two cocks are
				emptied, the twins pull themselves apart and return to the position where they started: flanking you and dancing their tongues over yours and each
				other's.
			</p>`;

			return html;
		},
		/**
		 * Context: PC finds a tasty prey while taking a relaxing stroll through the arc.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderStrangerScene: function(data) {
			let html = `
			<p>
				It isn't really the eye contact itself that entices you; it's the whole package. The jacket zipped down far enough to suggest there's nothing beneath but a
				bra for comfort. The dark and sheer stockings that run up under her knee-length skirt. You wonder if she came here with the first wave of settlers or has
				newly immigrated. You consider asking ${V.assistant.name} for a full history, but in the spirit of a birthday surprise, you leave ${data.assistPN.her} alone for
				now. You approach the bench and take a seat next to her.
			</p>
			<p>
				You play aloof. Because hell, it just feels like a cool thing to do. You give a nod to a security guard. You scroll through some stock listings on your
				phone. You lean back and just <em>absorb the day</em> with an, admittedly, unconvincing yawn.
			</p>
			<p>
				"What's your deal?", she asks you in a mock-sassy tone, and you can <em>hear</em> one of her eyebrows arched high. "You're walking around like you own the
				place." The tongue-in-cheek irony is clear in her voice.
			</p>
			<p>
				You effectively shrug off the insinuation, remaining coy.
			</p>
			<p>
				"'S'kinda weird for you to be out here in the commons, sitting on a bench with a commoner. Where's all your fuck-slaves?"
			</p>
			<p>
				You tersely tell her they are busy fucking or getting fucked.
			</p>
			<p>
				"Fair enough." She puts her phone – her failed (or successful?) prop – away. "There's a lot of rumors about you, you know. I don't know how much you pay
				attention to that shit." You shrug and invite her to share a few. "You've got a giant dong. Or you've got no dong. Or sometimes two, but I think that one
				started as a joke that some people took too seriously. They say you're a killer. Cold-blooded. Anyone gets in your way..." Her hand mimes a gun and shoots
				an invisible bullet. "They say you designed the arc yourself. They say you overtook it from someone else. They say you stole it from your own father. They
				say you barely know what an arc is because you're fried out of your fucking mind most days. Like I said, they say a lot of shit."
			</p>
			<p>
				You ask her what she believes. "Well you ain't fried right now. And I don't know if you built it or stole it but you have enough sense that you keep it
				running. And." During the pause you watch the slightest bite of her lip from the corner of your eye.
				"`;

			if (V.PC.dick) {
				html += `Jury's still out on whether you have a giant dong. But I'm thinking you do.`;
			} else {
				html += `Jury's still out on whether you're missing a dong. But I'm hoping you are.`;
			}

			html += `"
				She grazes a palm toward your inner thigh.
			</p>`;

			const frag = fragment(html);

			App.Events.addResponses(
				frag,
				[
					new App.Events.Result("Offer her a chance to find out", () => {
						if (V.PC.dick) {
							return this.renderStrangerScene_PCBones(data);
						} else {
							return this.renderStrangerScene_PCGetsBoned(data);
						}
					}),
				]
			);

			return frag;
		},
		/**
		 * Context: variant of the stranger scene; PC has penis, stranger has vagina.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderStrangerScene_PCBones: function(data) {
			let html = `
			<p>
				Her wrists bound in straps behind her back, her mouth now knows exactly how big your dong is. You sit at the edge of your bed, where she
				kneels on the floor before you, her head bobbing in your lap. Your fingers splay through her soft, black hair as you hold her head. She
				works your dick like a popsicle. Her skirt and stockings have stayed on, but her jacket and bra have been abandoned. Her pert C-cups dangle
				from her chest as her body sways. You press her head down and feel your dick nudge the back of her throat. You ease off as she gags, giving
				her a moment to adjust. She aligns her neck and takes you in again, your cock slipping in deeper this time. Her swallowing muscles grasp at
				your cock and milk its tip. You pull her head back and start fucking her mouth. Her lips keep as tight a seal on your shaft as they can
				while her tongue pulses and flails underneath.
			</p>
			<p>
				Ready to explore more of your prize, you lift her up by the arm and toss her face-down on the bed. Her ass goes up into the air because
				she's a smart (and horny) girl. Her skirt hangs down over her rear but that's no concern; you flip it back over her body. Now exposed are
				her charcoal-gray panties with an adorable pink bunny face smiling at you on the back. They are pulled down to her knees. She <em>aches</em>
				for it; it's obvious from the arrhythmic waver of her hips which she constantly pushes toward you. You nudge her ass forward and spread her
				legs apart. You see the delicate inner folds of her labia nestling the erect clit at the top of her crease. You bring your tongue in for a
				taste. She tries to wiggle her pussy into your face but you hold her hips steady. Your tongue glides over and around the button, then traces
				the length of her slit. Her taste is sublime; creamy, barely salty, something between sweet and savory. It sits well on your tongue, which
				you probe into the inner regions of her fuck hole. She muffles her moans into the mattress.
			</p>
			<p>
				You climb to your knees behind her and where your tongue explored, now the tip of your cock follows. It wrestles against the pitiable
				clitoris, so desperate for friction, and becomes lubricated as it slips its way from one end of her crevice to the other. So soft and moist
				are the outer lips of her mound that without explicitly trying, your tip falls prey to her venus fly trap. A perfectly fine turn of events.
				You grab her hips and plunge deep into her canal. You feel the billowy textures and contours of her inner walls as they squeeze and devour
				your prick. You rock her hips back and forth, steady, while her bound hands stretch to touch your skin with their fingertips. You then grab
				her arms and use them as leverage against her body, lifting her head off the bed and pumping her hips against your groin.
			</p>
			<p>
				As your pace increases, you want a more solid frame to fuck. You flatten her onto the bed and decide that her arms are now going to be in
				the way. You undo the clasps of the straps and set her hands free. You waste little time bearing your body down onto her, creating an
				indentation within the mattress in the shape of her body. You fuck her tight young snatch deep and hard while her hands frantically try to
				find purchase on your skin. As each thrust through the deeper muscles of her pussy drives a charge through her nerves, she constantly battles
				between feeling her lover's body and keeping herself from potentially exploding. She seems to be losing, as guttural and euphoric sounds
				escape her lips.
			</p>
			<p>
				You withdraw and flip the dark creature over. In part out of charity; in part because you want to taste the perky pink buds that top her
				breasts. You knead and grope her tits as you suck at her protruding nipples. She finally lands her palms on the small of your back and seems
				to bask in the warmth of your body. You move up to kiss the girl's lips, and delight as she can't help but moan into your mouth as you enter
				her again. Your hands lock behind her shoulders and you resume fucking this girl silly. You employ the full length and girth of your cock to
				stimulate her poor clit, and she – as far as you can tell – might literally die from the pleasure. Her fingers squeeze your ass,
				glide up to your shoulders, and one continues up to the crown of your head. Her pussy clenches, massages, constricts. You can only assume
				she's come, presumably several times, by now because there can't possibly be another level above where she's been.
			</p>
			<p>
				Your mind races back to the sight of this girl sitting coyly on the bench in the commons, and how you imagined the sight and taste and
				smell under her skirt, and jump forward again to those sensations around you. You buck your hips forward and hold; your semen gushes out
				and pools within the deep recesses of her pussy. One of her graceful hands lands on either side of your face and pulls you into a deep kiss
				as you continue to coat her uterus with your seed. Soon fully spent, you drift off to a recuperating nap.
			</p>
			<p>
				You wake with her head on your chest. She gives it a petite kiss. "There's another rumor about you."
			</p>
			<p>
				Curious, you ask what it is.
			</p>
			<p>
				"That today is your birthday."
			</p>
			<p>
				You softly chuckle but don't respond.
			</p>
			<p>
				"Happy birthday."
			</p>`;

			/* END */
			return html;
		},
		/**
		 * Context: variant of the stranger scene; PC has vagina, stranger has penis.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderStrangerScene_PCGetsBoned: function(data) {
			let html = `
			<p>
				Her wrists bound in straps behind her back, she is helpless to do more than watch you engulf her cock in your mouth. Your hands explore her
				torso and fondle her tits, which fit comfortably in the squeeze of your palms. It wasn't long into your flirting session that you noticed a
				peculiar lift happening with her skirt. But also it wasn't as if she were hiding it. Now her skirt is pulled up and her jacket and bra have
				come off. She sits over the edge of your bed, stockings still clinging to her calves and thighs, her eyes closed as she focuses on the
				sensation of your tongue on her dick. <em>Don't get used to it,</em> you think, <em>this is just preamble.</em> You massage her balls as
				your lips stroke her prick off. You slip a finger between your legs and, a slippery surface waiting for it, decide to move on.
			</p>
			<p>
				You push the girl back down on the bed and clamber atop it. Your legs steeple above her body, and her body rests atop her restrained arms.
				You walk with your knees until you pass over her head. You glance between and behind you. Her pretty face is fixated on the opening between
				your legs. Just perfect, you decide. You bring the two closer together, squatting down until the puffy outer lips of your vulva are nestled
				at the girl's mouth. A tongue lunges at your swollen clit and boxes it playfully; circling it, licking it, putting it back and forth. Her
				lips purse around it and suckle gently. You bear down slightly more as you arch your back and clench her abandoned dick with a firm grasp.
				You play a simple and undisclosed game with her; she grazes the length of your cunt with her tongue, and you offer her a stroke of her
				shaft. She doesn't catch on at first. She alternates between dainty licks, exploratory probes, and suckling kisses. Only on full,
				clit-to-taint glides do you pump her dick. As she grows more desperate to please you, and to be pleased herself, she finally solves the
				puzzle. Soon she moves from quick grazes to full sweeps and is rewarded with her dick being jacked as swiftly as she can stroke her tongue.
			</p>
			<p>
				You're pleased she won your game, but now you want something inside you. And not just prodding your outer opening... Something deep and
				substantial. You shuffle back down her body and meet the tip of her cock to the flush lips now coated with a mix of her saliva. She tries to
				bring her head off the mattress to touch any part of your skin with her lips, but she doesn't succeed. In fact, you take a hand to her chest
				and hold her in place. With your other hand you ensure her engorged phallus enters you properly. By ${V.showInches === 2 ? "inches" : "centimeters"} you feel it slip deeper. Your
				walls convulse around it, involuntarily. Whenever she seems to speak, you put a finger to her lips. Always she stops speaking; on occasion
				she suckles the fingertip. Now the base of her shaft passes through your inner labia, and she is fully inside you. You rock your clit
				against the manifest protrusion of her dick from her crotch. From barely any motion you slowly build your tempo. You give yourself time
				to explore the body beneath you. You watch its gentle curves and soft form. You pinch the pink buds topping her C-cups and twist playfully.
				She is getting louder, louder than you would have expected from such a dark-clad young woman. She is inside you, deep and substantial, like
				you desired. Her cock plunges inside you and fills the clasping walls of your pussy; its tip pounds against the sensitive a-spot deep
				within you.
			</p>
			<p>
				This was fun, and you enjoyed it, but you have hit a new plateau and need to reach the summit. You dismount the poor girl, sit upright,
				and quickly free her from her leather restraints. Her mouth moves to speak again but a look shuts her up. You lie back onto the bed and pull
				her atop you. Your aren't wasting any time and you make sure she realizes this. Stationed between your legs, she presses into you again,
				going deeper much more easily now. You bring her mouth to your tit and she suckles obediently, fucking you continuously and to a tempo you
				set by guiding her hips with your hands.
			</p>
			<p>
				You wrap your legs around hers and bring her mouth to your lips. Her fuck rod has perfect access and she pumps into you autonomously now as
				you hold her body close, feeling breasts against breasts, sweat dripping onto sweat, pants and sighs and her lustful moans filling the
				bedroom air. Like a spring-loaded trap you are set off, and your muscles clamp down on the thick cock and <em>dare</em> it to escape. The
				only thing that escapes is her seed, gushing and leaking inside you. Her back arches and she seems to cry out like a werewolf to a full
				moon. She jackhammers your cunt with a barrage of short thrusts as an aftershock courses through her and another hot stream of come is
				released. You pull her head back down to yours to passionately explore your little fuck-wolf's mouth with your tongue. As the crescendo
				subsides, your bodies ask you for a brief few minutes of reprieve.
			</p>
			<p>
				You wake with her head on your chest. She gives it a petite kiss. She moves to speak and expects you to quiet her, but you do not. "There's
				another rumor about you."
			</p>
			<p>
				Curious, you ask what it is.
			</p>
			<p>
				"That today is your birthday."
			</p>
			<p>
				You softly chuckle but don't respond.
			</p>
			<p>
				"Happy birthday."
			</p>`;

			/* END */
			return html;
		},
		/**
		 * Renders a small blurb used in the party scene.
		 * @param {App.Events.pcBirthday.EventData} data
		 */
		renderPartyScene_NoiseBlurb(data) {
			if (data.attire === "casual") {
				return `The light, fog, and bass-heavy music have effectively separated you from the rabble surrounding this display, but lustful moans occasionally break
				the barrier, suggesting that everyone is fully in the birthday spirit.`;
			} else {
				return `The light and fog have effectively separated you from the rabble surrounding this display, but lustful moans and rhythmic slaps betray the fact that
				likely everyone is fully in the birthday spirit.`;
			}
		}
	};
})(App.Events.pcBirthday);
