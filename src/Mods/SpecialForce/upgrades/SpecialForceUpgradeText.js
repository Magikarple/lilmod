// cSpell:ignore amphet, PGTframe, surviv, recom, torp, thermobaric

App.Mods.SF.UnitText = function(input) {
	let text = ``;
	const S = V.SF.Squad;
	// Sorted by case
	let appear = `is currently constructed in a haphazard fashion.`;
	let barracks = `Soldiers' cots are mixed in with weapons crates and ammunition.`;
	let slave = `Cages for processing slaves lie off to one side,`;
	let common = `and in the center is a common area with tables for soldiers to gather around for meals or rowdy conversations.`;
	let garage = ``;
	let drone = ``;
	let hangar = ``;
	let launch = ``;
	let artillery = ``;
	let comms = ``;
	let training = ``;

	const Quantity = `the ${num(V.SF.ArmySize)} members of ${V.SF.Lower}`;

	let weapons = `The weapons are mostly worn rifles that have already seen years of service before ${V.SF.Lower} acquired them.`;
	let armor1 = `The body armor is enough to stop smaller calibers, but nothing serious.`;
	let radio = ``;
	let helmets = ``;
	let ammo0 = ``;
	let uniforms = ``;
	let special = ``;
	let exo = ``;

	let amphet = ``;
	let phen = ``;
	let steroid = ``;
	let downer = ``;
	let concen = ``;
	let stimpack = ``;
	let stabilizer = ``;

	let a = `have been recommissioned for use by ${V.SF.Lower}`;
	let b = `.`;
	let c = ``;
	let d = ``;
	let e = ``;
	let f = ``;
	let g = ``;
	let h = ``;
	let i = ``;
	let j = ``;
	let k = ``;

	let activate = `has been recommissioned for use by ${V.SF.Lower}. They`;
	let mechanics = `, and mechanics are methodically checking the recent purchases for battle-readiness`;
	let MG = `120 mm main gun is enough to handle the majority of opponents around the Free Cities.`;
	let engine1 = ``;
	let armor2 = ``;
	let armor22 = ``;
	let ammo1 = ``;
	let mg = ``;
	let fireC0 = ``;
	let fireC1 = ``;
	let fireC2 = ``;
	let fireC3 = ``;
	let turret = ``;

	let B = `has been recommissioned for use by ${V.SF.Lower}. They`;
	let C = `, mechanics are giving the new purchases a final tune-up`;
	let squad = `a squad`;
	let G1 = `20`;
	let G2 = `in a firefight`;
	let e0 = `The engine has been`;
	let engine3 = ``;
	let armor3 = ``;
	let tires = ``;
	let m1 = ``;
	let m2 = ``;
	let pod1 = ``;
	let pod2 = ``;

	let b1 = `has been sold to ${V.SF.Lower} through back channels to support a failing old world nation. The tank is so large it cannot fit inside the garage, and has`;
	let c1 = ``;
	let engines4 = `. Two engines power the left and right sides of the tank separately, leaving it underpowered and slow`;
	let gun0 = ``;
	let gun1 = ``;
	let gun2 = `an undersized main gun and makeshift firing system from a standard battle tank`;
	let armor5 = ``;
	let armor6 = ``;
	let cannon = ``;
	let laser = ``;
	let PGTframe = ``;

	let W1 = `only armed`;
	let W2 = `;`;
	let W3 = `a poor weapon against flying targets, but enough to handle ground forces`;
	let group = `A small group of attack VTOL have been recommissioned for use by ${V.SF.Lower}, enough to make up a squadron`;
	let engines = ``;
	let TAI = ``;
	let lock = ``;
	let support = ``;
	let stealth = ``;
	let scramble = ``;
	let PAI = ``;

	let Num = `number`;
	let type = `tiltrotor`;
	let capacity = `small platoon or 15`;
	let engines0 = ``;
	let engines01 = ``;
	let Radar = ``;
	let Armor = ``;
	let landing = ``;
	let miniguns = ``;
	let counter = ``;

	let engine20 = `ramjet engines in the atmosphere that can reach Mach 10`;
	let b5 = `has been purchased from an insolvent old world nation. It `;
	let shield = ``;
	let camera = ``;
	let efficiency = ``;
	let camera2 = ``;
	let drag = ``;
	let crew = ``;
	let engine2 = ``;
	let skin = ``;

	let activate2 = `has been recommissioned for use by ${V.SF.Lower}. Currently, it `;
	let barrels = `Miniguns and Gatling cannons line`;
	let distance = `, though the distance to ground targets renders the smaller calibers somewhat less useful`;
	let b4 = ``;
	let c2 = ``;
	let fuel = ``;
	let gsSpeed = ``;
	let countermeasures = ``;
	let ammunition = ``;
	let DFA = ``;
	let autocannon = ``;

	let loc1 = `An unused science satellite has been purchased from an old world nation. While currently useless, it holds potential to be a powerful tool.`;
	let gyro = ``;
	let telemetry = ``;
	let thrusters = ``;
	let solar = ``;
	let surviv = ``;
	let laser1 = ``;
	let heat = ``;
	let reactor = ``;
	let lens = ``;
	let kin = ``;

	let loc = `has been purchased from a crumbling old world nation. It`;
	let power = `Large batteries mounted in oversized shoulders power the robot for up to ten minutes of use, though they make for large targets.`;
	let knife = `simply a 8.5 meter long knife, though additional weapons are under development.`;
	let armor8 = ``;
	let actuator = ``;
	let cannon1 = ``;
	let heatsink = ``;
	let ammo2 = ``;
	let missile = ``;

	let a4 = `A cruise missile launch site has been constructed near the base of`;
	let b2 = `outdated, something quickly rigged together to give the launch site something to fire in the case of an attack`;
	let c8 = ``;
	let d1 = ``;
	let e1 = ``;
	let f1 = ``;
	let g1 = ``;
	let h1 = ``;

	let recom1 = `has been recommissioned from the old world for ${V.SF.Lower}. It`;
	let jets = `Formerly mothballed strike jets`;
	let radar = ``;
	let AAG = ``;
	let prop = ``;
	let torp = ``;
	let armor9 = ``;
	let power1 = ``;
	let scramble1 = ``;

	let recom = `has been recommissioned from the old world, and`;
	let reactor0 = `Because diesel engines provide power and breathing oxygen is kept in pressurized canisters, the sub must frequently surface.`;
	let reactor1 = ``;
	let cal = ``;
	let hull = ``;
	let tubes = ``;
	let torpedoes = ``;
	let sonar = ``;
	let control = ``;
	let missiles = ``;

	let recom2 = `has been recommissioned for use by ${V.SF.Lower}. It `;
	let tons = `200`;
	let skirt = ``;
	let guns = ``;
	let guns2 = ``;
	let fans = ``;
	let speed = ``;
	let turbines = ``;
	let armor10 = ``;
	let ramps = ``;
	let HATframe = ``;
	let loadout = ``;

	let loc2 = ``;
	if (V.week % 6 === 0) {
		loc2 += `is`;
		if (input !== 'HAT') {
			loc2 += ` moored to`;
		} else {
			loc2 += ` parked on`;
		}
		loc2 += ` the pier in the Naval Yard`;
		if (input === 'HAT') {
			loc2 += `, ready to ferry ${tons} tons of soldiers and vehicles`;
		}
	} else {
		loc2 += `is patrolling the waters near ${V.arcologies[0].name}`;
	}
	switch (input) {
		case 'firebase':
			if (S.Firebase >= 0) {
				const text0 = `<b>Firebase:</b>`;
				if (S.Firebase >= 1) {
					appear = `has had some organization put into it.`;
					barracks = `The majority of weapons, armor, and ammunition have been separated from the soldiers' cots into their own armory.`;
					garage = `A section near the outer wall of the arcology has been converted to a garage with an adjoining vehicle maintenance bay`;
					drone = `.`;
				}
				if (V.terrain === "oceanic") {
					garage += ` for inter-arcology travel`;
				}
				if (S.Firebase >= 2) {
					barracks = `A barracks has been constructed near the armory, allowing soldiers a quieter place to sleep and store their personal spoils.`;
					drone = `; as well as a facility for the storage, maintenance, and deployment of armed combat drones.`;
				}
				if (S.Firebase >= 3) {
					appear = `has become more permanent.`;
					barracks = `A command center has been constructed near the barracks and armory, allowing for additional support personnel.`;
				}
				if (S.Firebase >= 4) {
					hangar = `Hangar space for storing and repairing aircraft has been converted from unused space on the other side of the garage.`;
				}
				if (S.Firebase >= 5) {
					appear = `is nearing the appearance of a military base.`;
					launch = `The rest of the Firebase has been designated for special projects.`;
					artillery = `Artillery batteries are set around the base of the arcology.`;
				}
				if (V.terrain === "oceanic" || V.terrain === "marine") {
					launch += ` A Naval Yard has been constructed in the waters near the arcology.`;
				}
				if (S.Firebase >= 6) {
					common = `and in the center is a common area for recreation, including a small movie theater and a mess hall.`;
				}
				if (S.Firebase >= 7) {
					slave = `A slave detention facility has been sectioned off to one side`;
					if (V.SF.Depravity > 1.5) {
						slave += ` emanating the sounds of rape and torture`;
					}
					slave += `;`;
				}
				if (S.Firebase >= 8) {
					appear = `has become a fully fledged military base.`;
					comms = `A Free City-wide communication network for ${V.SF.Lower} has been constructed to facilitate faster responses and efficient monitoring of the surrounding area.`;
				}
				if (S.Firebase >= 9) {
					training = `A high-tech killhouse has been constructed to aid in soldier training.`;
				}
				if (S.Firebase >= 10) {
					artillery = `Railgun artillery batteries are set around the base of the arcology, capable of accurately destroying enemies an absurd distance away.`;
				}
				return `${text0} The firebase ${appear} ${barracks} ${comms} ${training} ${slave} ${common} ${garage}${drone} ${hangar} ${launch} ${artillery}`;
			}
			break;
		case 'troop':
			if (V.SF.ArmySize > 0) {
				const text1 = `<br>&nbsp;The large dormitories are`;
				if (V.SF.ArmySize < 100) {
					return `${text1} sparsely occupied, ${Quantity} residing within them concentrating together in a corner. The hundreds of empty beds and lockers visibly herald the future.`;
				} else if (V.SF.ArmySize < 400) {
					return `${text1} lightly occupied, with ${Quantity} starting to spread out across them.`;
				} else if (V.SF.ArmySize < 800) {
					return `${text1} moderately occupied, though ${Quantity} residing within have a considerable amount of extra room.`;
				} else if (V.SF.ArmySize < 1500) {
					return `${text1} well-occupied, and ${Quantity} residing within have started to form small cliques based on section and row.`;
				} else {
					return `${text1} near capacity, and ${Quantity} often barter their personal loot, whether it be monetary or human, for the choicest bunks.`;
				}
			}
			break;
		case 'Armoury':
			if (S.Armoury >= 0) {
				const text2 = `<br><b>Armoury:</b><br>`;
				if (S.Armoury >= 2) {
					radio = `Radios have been wired into the soldiers helmets`;
					helmets = `.`;
				}
				if (S.Armoury >= 2) {
					helmets = ` and a HUD has been integrated into the soldier's eyewear.`;
				}
				if (S.Armoury >= 3) {
					ammo0 = `Tactical vests have been provided, allowing soldiers to carry additional ammo.`;
				}
				if (S.Armoury >= 4) {
					armor1 = `The body armor is a newer variant, able to stop small arms fire and protect against shrapnel.`;
				}
				if (S.Armoury >= 5) {
					weapons = `The weapons are modern rifles and sidearms, putting ${V.SF.Lower} on par with rival mercenary outfits.`;
				}
				if (S.Armoury >= 6) {
					uniforms = `New uniforms have been distributed that are more comfortable and made of breathable fabric to keep soldiers from overheating.`;
				}
				if (S.Armoury >= 7) {
					special = `Specialized weaponry is available for many roles, allowing more flexibility in planning.`;
				}
				if (S.Armoury >= 8) {
					helmets = `and a HUD and camera display have been integrated into soldiers' eyewear, enabling accurate aim around corners or from behind cover.`;
				}
				if (S.Armoury >= 9) {
					exo = `An exosuit has been developed to reduce the amount of weight soldiers carry, increase lifting strength, and move faster in combat.`;
				}
				if (S.Armoury >= 10) {
					weapons = `Cutting-edge weaponry is available to ${V.SF.Lower}, far outpacing the ability of rival mercenary outfits.`;
				}
				return `${text2} The armory holds soldiers' weapons and gear while not in training or combat. ${weapons} ${special} ${armor1} ${radio} ${helmets} ${ammo0} ${uniforms} ${exo}`;
			}
			break;
		case 'drugs':
			if (S.Drugs >= 0) {
				const text3 = `<br><b>Drug Lab:</b>`;
				if (S.Drugs >= 2) {
					amphet = `Amphetamines have been added to the cocktail at a low dosage to act as a stimulant, physical performance enhancer, and cognition control enhancer. Some side-effects exist.`;
				}
				if (S.Drugs >= 2) {
					phen = `Phencyclidine has been added to the cocktail at a low dosage as a dissociative psychotropic for soldiers in battle to introduce feelings of detachment, strength and invincibility, and aggression. Some side-effects reduce the tolerable dosage before soldiers go on uncontrollable violent outbreaks.`;
				}
				if (S.Drugs >= 3) {
					steroid = `Testosterone is being produced for soldiers in training as a natural muscle growth stimulant and to invoke aggression.`;
				}
				if (S.Drugs >= 4) {
					downer = `Zaleplon is being produced as a downer to counteract the battle cocktail and encourage rest before combat.`;
				}
				if (S.Drugs >= 5) {
					concen = `Methylphenidate has been added to the cocktail as a stimulant and to improve soldier concentration.`;
				}
				if (S.Drugs >= 6) {
					phen = `A phencyclidine-based drug has been added to the cocktail as a dissociative psychotropic for soldiers in battle to introduce controllable feelings of detachment, strength and invincibility, and aggression.`;
				}
				if (S.Drugs >= 7) {
					steroid = `Low levels of anabolic steroids are being produced for soldiers in training to stimulate muscle growth and invoke aggression.`;
				}
				if (S.Drugs >= 8) {
					amphet = `Diphenylmethylsulfinylacetamide has been added to the cocktail to counteract the effects of sleep deprivation and promote alertness.`;
				}
				if (S.Drugs >= 9) {
					stimpack = `A stimpack of the battle cocktail is being given to soldiers in battle to take if the original dose wears off before the battle is over.`;
				}
				if (S.Drugs >= 10) {
					stabilizer = `A stabilizer has been added to the battle cocktail that helps tie effects together while reducing side-effects, leading to an effectively safe supersoldier drug.`;
				}
				return `${text3} A drug lab has been established to increase the effectiveness of ${V.SF.Lower}'s soldiers. Many of these chemicals are mixed into a single 'battle cocktail' to be taken before combat. ${amphet} ${phen} ${concen} ${steroid} ${downer} ${stimpack} ${stabilizer}`;
			}
			break;
		case 'UAV':
			if (S.Firebase >= 2 && S.Drones >= 1) {
				const text4 = `<br><b>Drone Bay:</b>`;
				if (S.Drones >= 2) {
					a = `equipped with missiles are resting on one side of the drone bay`;
					b = `; as well as destroying the occasional target.`;
				}
				if (S.Drones >= 3) {
					c = `A fleet of`;
					d = `large delivery quadcopters have been converted for military service to support ground forces as combat drones.`;
				}
				if (S.Drones >= 4) {
					d = `combat drones take up the rest of the space in the drone bay. They have a`;
					e = `small automatic rifle`;
					f = `mounted to the underside.`;
				}
				if (S.Drones >= 5) {
					g = `Armor has been added to protect vulnerable components from small arms fire.`;
				}
				if (S.Drones >= 6) {
					h = `The fleet's batteries have been replaced with higher capacity models, increasing the functional time spent in combat.`;
				}
				if (S.Drones >= 7) {
					i = `The propellers and motors have been upgraded, increasing maneuverability and speed.`;
				}
				if (S.Drones >= 8) {
					j = `The drone control signal has been boosted and encrypted, giving the drones a greater range and protecting against electronic warfare.`;
				}
				if (S.Drones >= 9) {
					e = `light machine gun`;
				}
				if (S.Drones >= 10) {
					k = `A drone-to-drone network has been installed, allowing drones to swarm, maneuver, and attack targets autonomously.`;
				}
				text += `${text4} Surveillance drones ${a}. During combat, they supply aerial intel to commanders and act as the communications network for ground forces${b} ${c} ${d} ${e} ${f} ${g} ${h} ${i} ${j} ${k}`;
			}
			return text;
		case 'AV':
			if (S.AV >= 1) {
				const text5 = `<br>&nbsp;&nbsp;<b>Assault:</b>`;
				if (S.AV >= 2) {
					engine1 = `The engine has been overhauled, allowing much faster maneuvering around the battlefield.`;
					activate = ``;
					mechanics = ``;
				}
				if (S.AV >= 3) {
					armor2 = `A composite ceramic armor has replaced the original, offering much greater protection from attacks.`;
				}
				if (S.AV >= 4) {
					ammo1 = `The tanks have been outfitted with additional types of ammo for situational use.`;
				}
				if (S.AV >= 5) {
					mg = `A remote-controlled .50 cal machine gun has been mounted on the turret to handle infantry and low-flying aircraft.`;
				}
				if (S.AV >= 6) {
					fireC0 = `A fire-control system`;
					fireC3 = `been installed, guaranteeing`;
					fireC2 = `has`;
					fireC1 = `accurate fire.`;
				}
				if (S.AV >= 7) {
					fireC1 = `rapid, accurate fire while separating the crew from the stored ammunition in the event the ammo cooks off.`;
					fireC2 = `and an autoloader have`;
				}
				if (S.AV >= 8) {
					armor22 = `A reactive armor system has been added, giving the tank an additional, if temporary, layer of protection.`;
				}
				if (S.AV >= 9) {
					turret = `The turret has been massively redesigned, lowering the tank profile and increasing the efficiency of the mechanisms within.`;
				}
				if (S.AV >= 10) {
					MG = `140 mm main gun can quash anything even the greatest old world nations could muster.`;
				}
				text += `${text5} A fleet of main battle tanks ${activate} are parked in the garage${mechanics}. ${turret} The ${MG} ${ammo1} ${mg} ${fireC0} ${fireC2} ${fireC3} ${fireC1} ${engine1} ${armor2} ${armor22}`;
			}
			return text;
		case 'TV':
			if (S.TV >= 1) {
				const text6 = `<br>&nbsp;&nbsp;<b>Transport:</b>`;
				if (S.TV >= 2) {
					engine3 = `${e0} overhauled, allowing for higher mobility.`;
					C = ``;
					B = ``;
				}
				if (S.TV >= 3) {
					armor3 = `Composite armor has been bolted to the exterior, increasing the survivability of an explosive attack for the crew and passengers.`;
				}
				if (S.TV >= 4) {
					tires = `The tires have been replaced with a much more durable version that can support a heavier vehicle.`;
				}
				if (S.TV >= 5) {
					m1 = `An automatic missile defense system has been installed,`;
					m2 = `targeting any guided missiles with laser dazzlers and deploying a smokescreen.`;
				}
				if (S.TV >= 6) {
					pod1 = `An anti-tank missile pod`;
					pod2 = `has been installed on the side of the turret.`;
				}
				if (S.TV >= 7) {
					G1 = `25`;
					G2 = `by attacking enemies through cover and destroying light armor`;
				}
				if (S.TV >= 8) {
					pod2 = `and an anti-aircraft missile pod have been installed on either side of the turret.`;
				}
				if (S.TV >= 9) {
					squad = `two squads`;
					armor3 = ``;
					m2 = `destroying any incoming missiles with a high-powered laser. Some of the now redundant composite armor has been removed, and the reclaimed space allows for more passengers.`;
				}
				if (S.TV >= 10) {
					engine3 = `${e0} replaced with the newest model, allowing the vehicle to get in and out of the conflict extremely quickly.`;
				}
				text += `${text6} A fleet of infantry fighting vehicles ${B} are parked in the garage${C}. The IFVs can carry ${squad} of 6 to a firezone. The ${G1} mm autocannon supports infantry ${G2}. ${pod1} ${pod2} ${engine3} ${armor3} ${tires} ${m1} ${m2}`;
			}
			return text;
		case 'PGT':
			if (S.PGT >= 1) {
				const text7 = `<br>&nbsp;<b>Prototype Goliath Tank:</b>`;
				if (S.PGT >= 2) {
					c1 = `rests in`;
					b1 = ``;
					engines4 = ` and powered by their own engine, allowing the tank to travel with an unsettling speed for its massive bulk`;
				}
				if (S.PGT >= 3) {
					gun0 = `a railgun capable of`;
					gun1 = `firing steel slugs`;
					gun2 = `through one tank and into another`;
				}
				if (S.PGT >= 4) {
					armor5 = `The armor has been`;
					armor6 = `reinforced, increasing survivability for the crew inside.`;
				}
				if (S.PGT >= 5) {
					cannon = `A coaxial 30mm autocannon has been installed in the turret, along with automated .50 cal machine guns mounted over the front treads.`;
				}
				if (S.PGT >= 6) {
					laser = `Laser anti-missile countermeasures have been installed, destroying any subsonic ordinance fired at the Goliath.`;
				}
				if (S.PGT >= 7) {
					PGTframe = `The frame has been reinforced, allowing the Goliath to carry more armor and guns.`;
				}
				if (S.PGT >= 8) {
					armor6 = `redesigned with sloping and state-of-the-art materials, allowing the Goliath to shrug off even the most advanced armor-piercing tank rounds.`;
				}
				if (S.PGT >= 9) {
					gun1 = `firing guided projectiles`;
				}
				if (S.PGT >= 10) {
					gun0 = `a twin-barreled railgun capable of rapidly`;
				}
				text += `${text7} A prototype Goliath tank ${b1}${c1} its own garage housing built outside the arcology. The massive bulk is spread out over 8 tracks, two for each corner of the tank${engines4}. The turret is equipped with ${gun0} ${gun1} ${gun2}. ${cannon} ${armor5} ${armor6} ${laser} ${PGTframe}`;
			}
			return text;
		case 'AA':
			if (S.AA >= 1) {
				const text8 = `<br>&nbsp;&nbsp;<b>Assault:</b>`;
				if (S.AA >= 2) {
					W1 = `armed`;
					W2 = ` and air-to-air missiles,`;
					W3 = `a combination that can defend the arcology from enemy aircraft, as well as`;
					support = ` support ground troops`;
				}
				if (S.AA >= 3) {
					engines = `The engines have been tuned, allowing faster flight with greater acceleration.`;
				}
				if (S.AA >= 4) {
					TAI = `An advanced targeting AI has been installed to handle all control of weapons, allowing much more efficient use of ammunition and anti-countermeasure targeting.`;
				}
				if (S.AA >= 5) {
					lock = `Installed multispectrum countermeasures protect against all types of missile locks.`;
				}
				if (S.AA >= 6) {
					group = `A respectable number of attack VTOL protect your arcology, split into a few squadrons`;
				}
				if (S.AA >= 7) {
					support = ` attack ground targets`;
					W2 = `; rocket pods, and air-to-air missiles,`;
				}
				if (S.AA >= 8) {
					stealth = `The old skin has been replaced with a radar-absorbent material, making the aircraft difficult to pick up on radar.`;
				}
				if (S.AA >= 9) {
					scramble = `The VTOLs can scramble to react to any threat in under three minutes.`;
				}
				if (S.AA >= 10) {
					PAI = `A piloting AI has been installed, allowing the VTOLs to perform impossible maneuvers that cannot be done by a human pilot. This removes the need for a human in the aircraft altogether.`;
				}
				text += `${text8} ${group}. Several of the landing pads around ${V.arcologies[0].name} host groups of four fighters, ready to defend the arcology. ${scramble} The attack VTOL are currently ${W1} with a Gatling cannon${W2} ${W3}${support}. ${TAI} ${PAI} ${engines} ${lock} ${stealth}`;
			}
			return text;
		case 'TA':
			if (S.TA >= 1) {
				const text9 = `<br>&nbsp;&nbsp;<b>Transport:</b>`;
				if (S.TA >= 2) {
					engines0 = `The tiltrotor engines have been replaced with a more powerful engine, allowing faster travel times.`;
				}
				if (S.TA >= 3) {
					counter = `Multispectrum countermeasures have been added to protect against guided missiles.`;
				}
				if (S.TA >= 4) {
					miniguns = `Mounted miniguns have been installed to cover soldiers disembarking in dangerous areas.`;
				}
				if (S.TA >= 5) {
					Num = `large number`;
				}
				if (S.TA >= 6) {
					landing = `The landing equipment has been overhauled, protecting personnel and cargo in the event of a hard landing or crash.`;
				}
				if (S.TA >= 7) {
					Armor = `Armor has been added to protect passengers from small arms fire from below.`;
				}
				if (S.TA >= 8) {
					capacity = `large platoon or 20`;
					engines01 = `Further tweaks to the engine allow for greater lifting capacity.`;
				}
				if (S.TA >= 9) {
					Radar = `Radar-absorbent materials have replaced the old skin, making it difficult to pick up the VTOL on radar.`;
				}
				if (S.TA >= 10) {
					type = `tiltjet`;
					engines01 = ``;
					engines0 = `The tiltrotors have been replaced with tiltjets, allowing for much greater airspeed and acceleration.`;
				}
				text += `${text9} A ${Num} of transport ${type} VTOL have been recommissioned for use by ${V.SF.Lower}. The VTOLs are resting on large pads near the base, ready to load either a ${capacity} tons of material. ${engines0} ${engines01} ${Armor} ${landing} ${counter} ${Radar} ${miniguns}`;
			}
			return text;
		case 'SP':
			if (S.SpacePlane >= 1) {
				const text10 = `<br>&nbsp;<b>Spaceplane:</b>`;
				if (S.SpacePlane >= 2) {
					b5 = ``;
					shield = `The current heat shielding has been upgraded, reducing the likelihood of heat damage during reentry.`;
				}
				if (S.SpacePlane >= 3) {
					engine2 = ` and liquid rocket engines in orbit that can reach an equivalent Mach 18`;
				}
				if (S.SpacePlane >= 4) {
					camera = `A state-of-the-art camera has been installed in the underbelly that takes incredibly high resolution photos, but requires the frictionless environment of space to focus.`;
				}
				if (S.SpacePlane >= 5) {
					efficiency = `Tweaks to the engines have increased fuel efficiency to the point where midflight refueling is no longer necessary.`;
				}
				if (S.SpacePlane >= 6) {
					camera2 = `The camera sensor is capable of taking IR shots.`;
				}
				if (S.SpacePlane >= 7) {
					drag = `Miraculous advances in aerodynamics and materials allow frictionless flight, even while in the atmosphere.`;
				}
				if (S.SpacePlane >= 8) {
					crew = `Increased the crew comfort and life support systems to increase operational time.`;
				}
				if (S.SpacePlane >= 9) {
					skin = `Replaced the underbelly skin with a chameleon kit, matching the color to the sky above it.`;
				}
				if (S.SpacePlane >= 10) {
					engine2 = ` and liquid rocket engines in orbit that can reach an equivalent Mach 25`;
					engine20 = `experimental scramjet engines in the atmosphere that can reach Mach 15`;
				}
				text += `${text10} A prototype spaceplane ${b5} rests in the hangar, its black fuselage gleaming. The craft is powered by ${engine20}${engine2}. ${efficiency} ${shield} ${camera} ${camera2} ${drag} ${crew} ${skin}`;
			}
			return text;
		case 'GunS':
			if (S.GunS >= 1) {
				const text11 = `<br>&nbsp;<b>Gunship:</b>`;
				if (S.GunS >= 2) {
					b4 = `Infrared sensors have been added for the gunners to better pick targets.`;
					activate2 = ``;
				}
				if (S.GunS >= 3) {
					c2 = `The underside of the aircraft has been better armored against small-arms fire`;
					countermeasures = `.`;
				}
				if (S.GunS >= 4) {
					fuel = `Larger fuel tanks have been installed in the wings and fuselage, allowing the gunship to provide aerial support for longer periods before refueling.`;
				}
				if (S.GunS >= 5) {
					barrels = `25 mm Gatling cannons`;
					distance = `; allowing the gunship to eliminate infantry`;
					DFA = ` and light vehicles from above`;
					autocannon = ` and a 40 mm autocannon are mounted on`;
				}
				if (S.GunS >= 6) {
					gsSpeed = `The engines have been replaced, allowing both faster travel to a target, and slower travel around a target.`;
				}
				if (S.GunS >= 7) {
					countermeasures = `; and multi-spectrum countermeasures have been installed to protect against guided missiles.`;
				}
				if (S.GunS >= 8) {
					b4 = `Upgraded multi-spectrum sensors can clearly depict targets even with IR shielding.`;
				}
				if (S.GunS >= 9) {
					ammunition = `The ammunition storage has been increased, only slightly depriving loaders of a place to sit.`;
				}
				if (S.GunS >= 10) {
					DFA = `; both light and heavy vehicles, and most enemy cover from above`;
					autocannon = `; a 40 mm autocannon, and a 105 mm howitzer are mounted on`;
				}
				text += `${text11} A large gunship ${activate2} is being refueled in the hangar. ${barrels}${autocannon} the port side of the fuselage${distance}${DFA}. ${b4} ${ammunition} ${gsSpeed} ${c2}${countermeasures} ${fuel}`;
			}
			return text;
		case 'sat':
			if (S.Satellite >= 1) {
				const text12 = `<br>&nbsp;<b>Satellite:</b>`;
				if (S.Satellite >= 2) {
					if (V.SF.SatLaunched === 0) {
						loc1 = `The satellite is being worked on in the Launch Bay.`;
					} else {
						loc1 = `The satellite is in geosynchronous orbit, far above the arcology.`;
					}
					gyro = `A suite of sensors have been installed to ensure the satellite can detect attitude and orbital altitude.`;
				}
				if (S.Satellite >= 3) {
					telemetry = `Telemetry systems have been installed to communicate with the satellite in orbit, with strong encryption measures.`;
				}
				if (S.Satellite >= 4) {
					thrusters = `Thrusters have been installed to control satellite attitude and orbit.`;
				}
				if (S.Satellite >= 5) {
					solar = `A massive folding solar panel array, combined with the latest in battery technology allow the satellite to store an enormous amount of energy relatively quickly.`;
					surviv = `Enough of the satellite has been finished that it can expect to survive for a significant period of time in space.`;
				}
				if (S.Satellite >= 6) {
					laser1 = `A laser cannon has been mounted facing the earth, capable of cutting through steel in seconds`;
					heat = ` while generating a large amount of heat.`;
				}
				if (S.Satellite >= 7) {
					heat = `. The installed heatsink allows the laser cannon to fire more frequently without damaging the satellite.`;
				}
				if (S.Satellite >= 8) {
					reactor = `A small, efficient nuclear reactor has been installed to continue generating energy while in the Earth's shadow.`;
				}
				if (S.Satellite >= 9) {
					lens = `A higher quality and adjustable lens has been installed on the laser, allowing scalpel precision on armor or wide-area blasts on unarmored targets.`;
				}
				if (S.Satellite >= 10) {
					kin = `A magazine of directable tungsten rods have been mounted to the exterior of the satellite, allowing for kinetic bombardment roughly equal to a series of nuclear blasts.`;
				}
				text += `${text12} ${loc1} ${gyro} ${thrusters} ${telemetry} ${solar} ${reactor} ${surviv} ${laser1} ${heat} ${lens} ${kin}`;
			}
			return text;
		case 'GR':
			if (S.GiantRobot >= 1) {
				const text13 = `<br>&nbsp;<b>Giant Robot:</b>`;
				if (S.GiantRobot >= 2) {
					loc = ``;
					armor8 = `Armor plating has been mounted over the majority of the robot.`;
				}
				if (S.GiantRobot >= 3) {
					power = `The robot is now powered by an umbilical cable system instead of bulky and short-lived batteries.`;
				}
				if (S.GiantRobot >= 4) {
					knife = `a 25 meter plasma sword. The cutting edge uses plasma to melt and cut through targets, reducing the strain on the sword.`;
				}
				if (S.GiantRobot >= 5) {
					actuator = `The limb actuators have been replaced with a faster and more powerful variant, granting the robot the same.`;
				}
				if (S.GiantRobot >= 6) {
					cannon1 = `A custom 45 mm Gatling cannon rifle has been developed for ranged use`;
					ammo2 = `; though it lacks enough ammo storage for a main weapon.`;
				}
				if (S.GiantRobot >= 7) {
					heatsink = `Large heatsinks have been installed out of the back to solve a massive overheating problem. These heatsinks resemble wings, and tend to glow red with heat when in heavy use.`;
				}
				if (S.GiantRobot >= 8) {
					armor8 = ``;
					actuator = `Final actuator tweaks have allowed for the addition of exceptionally thick armor without any loss in speed or power.`;
				}
				if (S.GiantRobot >= 9) {
					ammo2 = `; with spare ammunition drums kept along the robot's waist.`;
				}
				if (S.GiantRobot >= 10) {
					missile = `Missile pods have been mounted on the shoulders.`;
				}
				text += `${text13} A prototype giant robot ${loc} rests in a gantry along the side of the arcology. The robot is as tall as a medium-sized office building, focusing on speed over other factors. ${power} ${armor8} ${actuator} ${heatsink} The main armament is ${knife} ${cannon1}${ammo2} ${missile}`;
			}
			return text;
		case 'ms':
			if (S.MissileSilo >= 1) {
				const text14 = `<br>&nbsp;<b>Cruise Missile:</b>`;
				if (S.MissileSilo >= 2) {
					b2 = `a modern missile`;
					c8 = `; tipped with a conventional warhead`;
				}
				if (S.MissileSilo >= 3) {
					d1 = `The launch systems have been overhauled, allowing a launch within seconds of an attack order being given.`;
				}
				if (S.MissileSilo >= 4) {
					e1 = `The missile engines have been tweaked, giving them a greater range.`;
				}
				if (S.MissileSilo >= 5) {
					f1 = `A passive radar has been installed, allowing the missile to follow moving targets.`;
				}
				if (S.MissileSilo >= 6) {
					a4 = `Several cruise missile launch sites have been constructed around`;
				}
				if (S.MissileSilo >= 7) {
					e1 = `The engine has been replaced, giving the missiles greater range and supersonic speeds.`;
				}
				if (S.MissileSilo >= 8) {
					g1 = `The ability to pick new targets should the original be lost has been added.`;
				}
				if (S.MissileSilo >= 9) {
					h1 = `The missile now uses its remaining fuel to create a thermobaric explosion, massively increasing explosive power.`;
				}
				if (S.MissileSilo >= 10) {
					c8 = ` that can be tipped with either a conventional or nuclear warhead`;
				}
				text += `${text14} ${a4} the arcology. The current missile armament is ${b2}${c8}. ${d1} ${e1} ${f1} ${g1} ${h1}`;
			}
			return text;
		case 'AC':
			if (S.AircraftCarrier >= 1) {
				const text15 = `<br>&nbsp;<b>Aircraft Carrier:</b>`;
				if (S.AircraftCarrier >= 2) {
					radar = `The island's radar and comms have been improved.`;
					recom1 = ``;
				}
				if (S.AircraftCarrier >= 3) {
					AAG = `The antiair guns have been updated to automatically track and predict enemy aircraft movement.`;
				}
				if (S.AircraftCarrier >= 4) {
					jets = `Modern strike jets with state-of-the-art armaments`;
				}
				if (S.AircraftCarrier >= 5) {
					prop = `The propellers have been redesigned, granting greater speed with less noise.`;
				}
				if (S.AircraftCarrier >= 6) {
					torp = `An anti-torpedo system detects and destroys incoming torpedoes.`;
				}
				if (S.AircraftCarrier >= 7) {
					armor9 = `Additional armor has been added to the hull and deck.`;
				}
				if (S.AircraftCarrier >= 8) {
					power1 = `The power plant has been converted to provide nuclear power.`;
				}
				if (S.AircraftCarrier >= 9) {
					scramble1 = `The catapult has been converted to an electromagnetic launch system, halving the time it takes to scramble jets.`;
				}
				if (S.AircraftCarrier >= 10) {
					jets = `Attack VTOL from the converted for carrier capability`;
				}
				text += `${text15} An aircraft carrier ${recom1} ${loc2}. ${jets} serve as its airpower. ${scramble1} ${power1} ${radar} ${AAG} ${torp} ${prop} ${armor9}`;
			}
			return text;
		case 'Sub':
			if (S.Sub >= 1) {
				const text16 = `<br>&nbsp;<b>Submarine:</b>`;
				if (S.Sub >= 2) {
					recom = ``;
					reactor0 = `A nuclear reactor provides power`;
					reactor1 = `; but because oxygen is still kept in pressurized canisters the sub must frequently surface to replenish its oxygen stocks.`;
				}
				if (S.Sub >= 3) {
					reactor1 = ` and an oxygen generator pulls O₂ from the surrounding seawater, allowing the submarine to remain underwater for months if necessary.`;
				}
				if (S.Sub >= 4) {
					cal = `Calibration of the propulsion systems has reduced the telltale hum of a moving sub to a whisper.`;
				}
				if (S.Sub >= 5) {
					hull = `The outer hull has been redesigned for hydrodynamics and sonar absorption.`;
				}
				if (S.Sub >= 6) {
					tubes = `The torpedo tubes have been redesigned for faster loading speeds`;
					torpedoes = `.`;
				}
				if (S.Sub >= 7) {
					sonar = `The passive sonar has been finely tuned to detect mechanical noises miles away.`;
				}
				if (S.Sub >= 8) {
					control = `The control room computers have been upgraded to automate many conn duties.`;
				}
				if (S.Sub >= 9) {
					torpedoes = `and launch more agile torpedoes.`;
				}
				if (S.Sub >= 10) {
					missiles = `The submarine has been outfitted with several cruise missiles to attack land or sea-based targets.`;
				}
				text += `${text16} An attack submarine ${recom} ${loc2}. ${reactor0}${reactor1} ${cal} ${hull} ${tubes}${torpedoes} ${sonar} ${control} ${missiles}`;
			}
			return text;
		case 'HAT':
			if (S.HAT >= 1) {
				const text17 = `<br>&nbsp;<b>Amphibious Transport:</b>`;
				if (S.HAT >= 2) {
					skirt = `The skirt has been upgraded to increase durability and improve cushion when traveling over uneven terrain and waves.`;
					recom2 = ``;
				}
				if (S.HAT >= 3) {
					guns = `A minigun`;
					guns2 = `has been mounted on the front corners of the craft to defend against attackers.`;
				}
				if (S.HAT >= 4) {
					fans = `The turbines powering the rear fans`;
					speed = `acceleration and speed.`;
					turbines = `have been replaced with a more powerful version, allowing greater`;
				}
				if (S.HAT >= 5) {
					armor10 = `The armor protecting its cargo has been increased.`;
				}
				if (S.HAT >= 6) {
					fans = `The turbines powering the rear fans and impeller`;
					speed = `acceleration, speed, and carrying capacity.`;
				}
				if (S.HAT >= 7) {
					guns = `A minigun and grenade launcher`;
				}
				if (S.HAT >= 8) {
					ramps = `The loading ramps have been improved, allowing for faster unloading.`;
				}
				if (S.HAT >= 9) {
					HATframe = `The frame has been widened and reinforced, allowing for more space on the deck.`;
				}
				if (S.HAT >= 10) {
					loadout = `An experimental loadout sacrifices all carrying capacity to instead act as a floating gun platform by mounting several rotary autocannons the deck, should the need arise.`;
				}
				text += `${text17} An air cushion transport vehicle, or hovercraft; ${recom2}${loc2}. ${guns} ${guns2} ${fans} ${turbines} ${speed} ${skirt} ${armor10} ${ramps} ${HATframe} ${loadout}`;
			}
			return text;
	}
};
