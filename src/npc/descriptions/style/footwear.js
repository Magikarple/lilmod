// cSpell:ignore jika-tabi, strappy

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.footwear = function(slave) {
	const r = [];
	const {
		he, him, his, He, woman
	} = getPronouns(slave);

	if (hasAnyLegs(slave) && !hasAnyQuadrupedLegs(slave)) {
		const bothFeet = hasBothLegs(slave);
		const feet = bothFeet ? "feet" : "foot";

		switch (slave.clothes) {
			case "a hijab and blouse":
			case "conservative clothing":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of comfortable sandals.`);
						} else {
							r.push(`a comfortable sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of nice leather boots.`);
						} else {
							r.push(`a nice leather boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of comfortable heels.`);
						} else {
							r.push("a comfortable heel.");
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of comfortable pumps.`);
						} else {
							r.push(`a comfortable heel`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of daringly high heels.`);
						} else {
							r.push(`a daringly high heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of comfortable platform shoes.`);
						} else {
							r.push(`a comfortable platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of comfortable platform heels.`);
						} else {
							r.push(`a comfortable platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of daringly high heels with equally thrilling platforms.`);
						} else {
							r.push(`daringly high heels with an equally thrilling platform.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "chains":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`buckled sandals that incorporate shackles at each ankle.`);
						} else {
							r.push(`a buckled sandal that incorporates shackles at ${his} ankle.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`utility boots with a shackle at each ankle.`);
						} else {
							r.push(`a utility boot with a shackle at ${his} ankle.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`sturdy heels, secured by metal buckles, with shackles at each ankle.`);
						} else {
							r.push(`a sturdy heel, secured by metal buckles, with a shackle at ${his} ankle.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`stout pumps, secured with a tight chain that winds around each ankle.`);
						} else {
							r.push(`a stout heel, secured with a tight chain that winds around ${his} ankle.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`painfully high metal heels, secured by buckles, with shackles at each ankle.`);
						} else {
							r.push(`a painfully high metal heel, secured by buckles, with a shackle at ${his} ankle.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`metal platform shoes that incorporate shackles at each ankle.`);
						} else {
							r.push(`a metal platform shoe that incorporates shackles at ${his} ankle.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`sturdy platform heels, secured by metal buckles, with shackles at each ankle.`);
						} else {
							r.push(`a sturdy platform heel, secured by metal bucklers, with a shackle at ${his} ankle.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`painfully high metal heels with terrifyingly tall platforms, secured by buckles and shackled to each ankle.`);
						} else {
							r.push(`a painfully high metal heel with a terrifying tall platform, secured by buckles and shackled to ${his} ankle.`);
						}
						break;
					default:
						r.push(`nothing.`);
				}
				break;
			case "Western clothing":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`soft leather moccasins.`);
						} else {
							r.push(`a soft leather moccasin.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`tooled leather cowboy boots.`);
						} else {
							r.push(`a tooled leather boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`high heeled cowboy boots.`);
						} else {
							r.push(`a high heeled cowboy boot.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`pump-shaped cowboy boots.`);
						} else {
							r.push(`a pump-shaped cowboy boot.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`thigh-high tooled leather cowboy boots with dangerously high heels.`);
						} else {
							r.push(`a thigh-high leather cowboy boot with a dangerously high heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`platformed cowboy boots.`);
						} else {
							r.push(`a platformed cowboy boot.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`high heeled cowboy boots with a platform base.`);
						} else {
							r.push(`a high heeled cowboy boot with a platform base.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`tooled leather cowboy boots with ridiculously tall platform heels that force ${him} to walk bow-legged.`);
						} else {
							r.push(`a tooled leather cowboy boot with a ridiculously tall platform heel.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`bare cowpoke feet.`);
						} else {
							r.push(`a bare cowpoke foot.`);
						}
				}
				break;
			case "overalls":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`aside from a pair of mudproof sneakers.`);
						} else {
							r.push(`aside from a mudproof sneaker.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`aside from a pair of utilitarian leather boots.`);
						} else {
							r.push(`aside from a utilitarian leather boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`aside from a pair of simple leather heels.`);
						} else {
							r.push(`aside from a simple leather heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`aside from a pair of mudproof pumps.`);
						} else {
							r.push(`aside from a mudproof heel`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`aside from a pair of extremely tall leather heels.`);
						} else {
							r.push(`aside from an extremely tall leather heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`aside from a pair of durable platform shoes.`);
						} else {
							r.push(`aside from a durable platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`aside from a pair of sturdy platform heels.`);
						} else {
							r.push(`aside from a sturdy platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`aside from a pair of extremely tall platform heels.`);
						} else {
							r.push(`aside from an extremely tall platform heel.`);
						}
						break;
					default:
						r.push(`down to ${his} ${feet}.`);
				}

				break;
			case "body oil":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of trainers`);
						} else {
							r.push(`a single trainer`);
						}
						r.push(`ready for a workout.`);
						break;
					case "boots":
						if (bothFeet) {
							r.push(`thigh-high stripper boots, since they're`);
						} else {
							r.push(`a thigh-high stripper boot, since it's`);
						}
						r.push(`${his} only way to dress up.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`heeled trainers,`);
						} else {
							r.push(`a heeled trainer,`);
						}
						r.push(`to look athletic and sexy at the same time.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`pump-shaped trainers,`);
						} else {
							r.push(`a pump-shaped trainer,`);
						}
						r.push(`for a slutty athletic look.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`ankle-supporting high heels to force ${him} as high as possible without damage.`);
						} else {
							r.push(`an ankle-supporting high heel so tall ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of trainers`);
						} else {
							r.push(`a single trainer`);
						}
						r.push(`with a sturdy platform fit for a workout.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`ankle-supporting platform heels`);
						} else {
							r.push(`an ankle-supporting platform heel`);
						}
						r.push(`to protect ${him} from sprains.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`extremely tall, but ankle-supporting, platform heels`);
						} else {
							r.push(`an extremely tall, but ankle-supporting, platform heel`);
						}
						r.push(`to protect ${him} from sprains.`);
						break;
					default:
						r.push(`nothing but a fine layer of oil on the tops of ${his} bare ${feet}.`);
				}
				break;
			case "a toga":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of leather sandals`);
						} else {
							r.push(`a leather sandal`);
						}
						r.push(`with a mirror image of the words "FUCK ME" embossed into the soles, so that if ${he} walks on sand the message will be visible in ${his} footprints.`);
						if (!canWalk(slave)) {
							r.push(`That is, if ${he} could walk.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`high leather boot sandals that remain comfortable`);
						} else {
							r.push(`a high leather boot sandal that remains comfortable`);
						}
						if (canWalk(slave)) {
							r.push(`after walking`);
							if (V.showInches === 2) {
								r.push(`25 miles`);
							} else {
								r.push(`40 kilometers`);
							}
							r.push(`in one`);
						} else {
							r.push(`all throughout the`);
						}
						r.push(`day.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`heeled sandals`);
						} else {
							r.push(`a heeled sandal`);
						}
						r.push(`with a mirror image of the words "POUND ME" embossed into the soles, so that if ${he} walks on sand the message will be visible in ${his} footprints.`);
						if (!canWalk(slave)) {
							r.push(`That is, if ${he} could walk.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`pump-like sandals`);
						} else {
							r.push(`a pump-like sandal`);
						}
						r.push(`with a mirror image of the words "BREED ME" embossed into the soles, so that if ${he} walks on sand the message will be visible in ${his} footprints.`);
						if (!canWalk(slave)) {
							r.push(`That is, if ${he} could walk.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`extremely tall heels`);
						} else {
							r.push(`an extremely tall heel`);
						}
						r.push(`with a mirror image of the words "FUCK ME" embossed into the soles, so that if ${he} walks on sand the message will be visible in ${his} footprints.`);
						if (!canWalk(slave)) {
							r.push(`That is, if ${he} could walk.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of platform sandals`);
						} else {
							r.push(`a platform sandal`);
						}
						r.push(`with a mirror image of the words "MOUNT ME" embossed into the soles, so that if ${he} walks on sand the message will be visible in ${his} footprints.`);
						if (!canWalk(slave)) {
							r.push(`That is, if ${he} could walk.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`platform heels`);
						} else {
							r.push(`a platform heel`);
						}
						r.push(`with a mirror image of the words "FUCK ME" embossed into the soles, so that if ${he} walks on sand the message will be visible in ${his} footprints.`);
						if (!canWalk(slave)) {
							r.push(`That is, if ${he} could walk.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`extremely tall platform heels`);
						} else {
							r.push(`an extremely tall platform heel`);
						}
						r.push(`with a penis embossed into the soles and a pair of lips in the heels, so that if ${he} walks on sand, oral sex will follow in ${his} footprints.`);
						if (!canWalk(slave)) {
							r.push(`That is, if ${he} could walk.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`bare feet.`);
						} else {
							r.push(`a bare foot.`);
						}
				}
				break;
			case "a huipil":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`little leather sandals.`);
						} else {
							r.push(`a little leather sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`high leather boots with thin rope laces and wooden heels.`);
						} else {
							r.push(`a high leather boot with thin rope laces and a wooden heel.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`beautiful wood and leather stilettos with an ornamented heel.`);
						} else {
							r.push(`a beautiful wood and leather stiletto with an ornamented heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`beautiful wood and leather pumps with an ornamented heel.`);
						} else {
							r.push(`a beautiful wood and leather heel with an ornamented heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`high wooden heels with leather straps.`);
						} else {
							r.push(`a high wooden heel with leather straps`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`simple wood and leather platform shoes.`);
						} else {
							r.push(`a simple wood and leather platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`beautiful wood and leather stilettos`);
						} else {
							r.push(`a beautiful wood and leather stiletto`);
						}
						r.push(`with an ornamented platform and heel.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`towering ornamented wood and leather platform heels.`);
						} else {
							r.push(`a towering ornamented wood and leather platform heel.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`bare feet`);
						} else {
							r.push(`a bare foot`);
						}
						r.push(`with a small ankle chain.`);
				}
				break;
			case "a skimpy loincloth":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`barbarous leather sandals.`);
						} else {
							r.push(`a barbarous leather sandal`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`barbarous leather boots with thin leather laces and bone heels.`);
						} else {
							r.push(`a barbarous leather boot with thin laces and a bone heel.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`barbarous leather stilettos`);
						} else {
							r.push(`a barbarous leather stiletto`);
						}
						r.push(`with an ornamented bone heel.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`barbarous leather pumps`);
						} else {
							r.push(`a barbarous leather heel`);
						}
						r.push(`with an ornamented bone heel.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`barbarous high bone heels`);
						} else {
							r.push(`a barbarous high bone heel`);
						}
						r.push(`with leather straps.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`barbarous leather sandals`);
						} else {
							r.push(`a barbarous leather sandal`);
						}
						r.push(`with a solid bone platform.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`barbarous leather stilettos`);
						} else {
							r.push(`a barbarous leather stiletto`);
						}
						r.push(`with an ornamented bone platform and heel.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`barbarous high bone platform heels`);
						} else {
							r.push(`a barbarous high bone platform heel with leather straps`);
						}
						r.push(`with leather straps.`);
						break;
					default:
						if (bothFeet) {
							r.push(`bare feet.`);
						} else {
							r.push(`a bare foot.`);
						}
				}
				break;
			case "a slutty qipao":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`little silk slippers.`);
						} else {
							r.push(`a little silk slipper.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`elegant leather boots.`);
						} else {
							r.push(`an elegant leather boot`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`brightly colored heels.`);
						} else {
							r.push(`a brightly colored heel`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`brightly colored pumps.`);
						} else {
							r.push(`a brightly colored heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`extreme heels that mimic bound feet.`);
						} else {
							r.push(`an extreme heel that mimics bound feet.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`brightly colored platform shoes.`);
						} else {
							r.push(`a brightly colored platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`small platform heels that mimic bound feet.`);
						} else {
							r.push(`a small platform heel that mimics bound feet.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`extreme platform heels that tightly bind ${his} feet.`);
						} else {
							r.push(`an extreme platform heel that tightly binds ${his} foot.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`bare stockinged feet.`);
						} else {
							r.push(`a bare stockinged foot.`);
						}
				}
				break;
			case "uncomfortable straps":
				r.push(`straps that`);
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`run down ${his} legs to end in sandals that incorporate shackles at each ankle.`);
						} else {
							r.push(`run down ${his} leg to end in a sandal that incorporates shackles at the ankle.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`run down ${his} legs to end in utility boots that incorporate shackles at each ankle.`);
						} else {
							r.push(`run down ${his} leg to end in a utility boot that incorporates shackles at the ankle.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`run down ${his} legs to end in high leather heels that incorporate shackles at each ankle.`);
						} else {
							r.push(`run down ${his} leg to end in a high leather heel that incorporates shackles at the ankle.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`run down ${his} legs to end in high leather pumps.`);
						} else {
							r.push(`run down ${his} leg to end in a high leather heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`end in high leather heels that force ${him} to stand almost on tiptoe.`);
						} else {
							r.push(`end in a high leather heel that forces ${him} to crawl all day.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`run down ${his} legs to end in platform shoes that incorporate shackles at each ankle.`);
						} else {
							r.push(`run down ${his} leg to end in a platform shoe that incorporates shackles at the ankle.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`run down ${his} legs to end in platform heels that incorporate shackles at each ankle.`);
						} else {
							r.push(`run down ${his} leg to end in a platform heel that incorporates shackles at the ankle.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`end in high platform heels that force ${him} to balance precariously on tiptoe.`);
						} else {
							r.push(`end in a high platform heel that forces ${him} to crawl all day.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`end in shackles at each heel, leaving ${his} feet bare.`);
						} else {
							r.push(`end in shackles at the heel, leaving ${his} foot bare.`);
						}
				}
				break;
			case "shibari ropes":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of rope sandals.`);
						} else {
							r.push(`a rope sandal`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of canvas boots`);
						} else {
							r.push(`a canvas boot`);
						}
						r.push(`attached to the rest of ${his} ropes.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of rope sandal heels`);
						} else {
							r.push(`a rope sandal heel`);
						}
						r.push(`attached to the rest of ${his} ropes.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of rope sandal pumps`);
						} else {
							r.push(`a rope sandal heel`);
						}
						r.push(`attached to the rest of ${his} ropes.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of rope sandal heels that force ${him} to stand almost on tiptoe. They are`);
						} else {
							r.push(`a rope sandal heel so tall it forces ${him} to crawl all day. It is`);
						}
						r.push(`attached to the rest of ${his} ropes.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of rope platform sandals.`);
						} else {
							r.push(`a rope platform sandal.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of rope platform sandal heels`);
						} else {
							r.push(`a rope platform sandal heel`);
						}
						r.push(`attached to the rest of ${his} ropes.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of rope platform sandal heels that force ${him} to stand on tiptoe. They are`);
						} else {
							r.push(`a rope platform sandal so tall it forces ${him} to crawl all day. It is`);
						}
						r.push(`attached to the rest of ${his} ropes.`);
						break;
					default:
						if (bothFeet) {
							r.push(`end at each ankle, leaving ${his} feet bare.`);
						} else {
							r.push(`end at the ankle, leaving ${his} foot bare.`);
						}
				}
				break;
			case "restrictive latex":
			case "a fallen nuns habit":
				r.push(`latex which`);
				switch (slave.shoes) {
					case "flats":
						r.push(`covers ${his} ${feet} as well.`);
						break;
					case "boots":
						if (bothFeet) {
							r.push(`ends in a pair of boots`);
						} else {
							r.push(`ends in a boot`);
						}
						r.push(`made from the same material.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`ends in a pair of high heels`);
						} else {
							r.push(`ends in a high heel`);
						}
						r.push(`made from the same material.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`ends in a pair of high pumps`);
						} else {
							r.push(`ends in a high heel`);
						}
						r.push(`made from the same material.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`ends in a pair of painfully high heels`);
						} else {
							r.push(`ends in a painfully high heel`);
						}
						r.push(`made from the same material, so tall ${he} must`);
						if (canWalk(slave)) {
							r.push(`walk nearly on tiptoe, and shaped so that ${he} must stick ${his} ass out to stand.`);
						} else if (canStand(slave)) {
							r.push(`stand nearly on tiptoe while sticking ${his} ass out to stand in the first place.`);
						} else {
							r.push(`crawl everywhere since standing is impossible, let alone moving.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`ends in a pair of platforms`);
						} else {
							r.push(`ends in a platform shoe`);
						}
						r.push(`made from the same material.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`ends in a pair of high platform heels`);
						} else {
							r.push(`end in a high platform heel`);
						}
						r.push(`made from the same material.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`ends in a pair of painfully high platform heels`);
						} else {
							r.push(`ends in a painfully high platform heel`);
						}
						r.push(`made from the same material, so tall ${he} must`);
						if (canWalk(slave)) {
							r.push(`walk on tiptoe and stick ${his} ass out to stand with any semblance of balance.`);
						} else if (canStand(slave)) {
							r.push(`stand on tiptoe and stick ${his} ass out to do so with any semblance of balance.`);
						} else {
							r.push(`crawl everywhere since standing is impossible, let alone moving.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`ends at the ankles, leaving ${his} feet bare.`);
						} else {
							r.push(`ends at the ankle, leaving ${his} foot bare`);
						}
				}
				break;
			case "a latex catsuit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`patent leather flats.`);
						} else {
							r.push(`a patent leather shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`laced thigh-high boots.`);
						} else {
							r.push(`a laced thigh-high boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`patent leather heels.`);
						} else {
							r.push(`a patent lather heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`patent leather pumps.`);
						} else {
							r.push(`a patent leather heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`laced ballet boots that limit ${him} to small, dainty steps.`);
						} else {
							r.push(`a laced ballet boot that makes it impossible for ${him} to stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`patent platform shoes.`);
						} else {
							r.push(`a patent platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`patent platform heels.`);
						} else {
							r.push(`a patent platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`patent high platform heels that limit ${him} to careful, dainty steps.`);
						} else {
							r.push(`a patent platform heel that makes it impossible for ${him} to stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing at the moment, leaving ${him} free to show off ${his} smooth`);
						if (bothFeet) {
							r.push(`legs.`);
						} else {
							r.push(`leg.`);
						}
				}
				break;
			case "attractive lingerie":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of cute flats.`);
						} else {
							r.push(`a cute flat shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of cute little ankle boots.`);
						} else {
							r.push(`a cute little ankle boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of sexy heels`);
						} else {
							r.push(`a sexy heel`);
						}
						r.push(`in the same color.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of sexy pumps`);
						} else {
							r.push(`a sexy heel`);
						}
						r.push(`in the same color.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of high stripper heels`);
						} else {
							r.push(`a high stripper heel`);
						}
						r.push(`in the same color.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of cute platforms`);
						} else {
							r.push(`a cute platform shoe`);
						}
						r.push(`in the same color.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of sexy platform heels`);
						} else {
							r.push(`a sexy platform heel`);
						}
						r.push(`in the same color.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of high stripper platform heels`);
						} else {
							r.push(`a high stripper platform heel`);
						}
						r.push(`in the same color, so tall`);
						if (canStand(slave)) {
							r.push(`that ${he} must stick ${his} ass and chest out to stand.`);
						} else {
							r.push(`${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "kitty lingerie":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of cute flats.`);
						} else {
							r.push(`a cute flat shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of cute little ankle boots.`);
						} else {
							r.push(`a cute little ankle boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of sexy heels.`);
						} else {
							r.push(`a sexy heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of sexy pumps.`);
						} else {
							r.push(`a sexy heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of high stripper heels.`);
						} else {
							r.push(`a high stripper heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of cute heart-shaped platforms.`);
						} else {
							r.push(`a cute heart-shaped platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of sexy heart-shaped heels.`);
						} else {
							r.push(`a sexy heart-shaped heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of high stripper platform heels`);
						} else {
							r.push(`a high stripper platform heel`);
						}
						r.push(`so tall`);
						if (canStand(slave)) {
							r.push(`that ${he} must stick ${his} ass and chest out to stand.`);
						} else {
							r.push(`${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "attractive lingerie for a pregnant woman":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of cute slippers.`);
						} else {
							r.push(`a cute slipper.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of cute little ankle boots.`);
						} else {
							r.push(`a cute little ankle boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of sexy heels`);
						} else {
							r.push(`a sexy heel`);
						}
						r.push(`in the same color.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of sexy pumps`);
						} else {
							r.push(`a sexy heel`);
						}
						r.push(`in the same color.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of high stripper heels`);
						} else {
							r.push(`a high stripper heel`);
						}
						r.push(`in the same color.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of cute, but sturdy, platforms.`);
						} else {
							r.push(`a cute, but sturdy, platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of sexy, yet sturdy, platform heels`);
						} else {
							r.push(`a sexy, yet sturdy, platform heel`);
						}
						r.push(`in the same color.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of high stripper platform heels`);
						} else {
							r.push(`a high stripper platform heel`);
						}
						r.push(`so tall`);
						if (canStand(slave)) {
							r.push(`that ${he} must stick ${his} ass and chest out to stand.`);
							if (slave.belly >= 10000) {
								r.push(`This has the lovely effect of forcing ${him} to straddle ${his} belly.`);
							}
						} else {
							r.push(`${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a maternity dress":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of comfortable sandals.`);
						} else {
							r.push(`a comfortable sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of nice leather boots.`);
						} else {
							r.push(`a nice leather boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of comfortable heels.`);
						} else {
							r.push(`a comfortable heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of comfortable pumps.`);
						} else {
							r.push(`a comfortable heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of daringly high heels.`);
						} else {
							r.push(`a daringly high heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of comfortable platform shoes.`);
						} else {
							r.push(`a comfortable platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of comfortable sturdy platform heels.`);
						} else {
							r.push(`a comfortable sturdy platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of daringly high platform heels`);
							if (slave.belly >= 10000) {
								r.push(`that add a sexy sway to ${his} gravid waddle.`);
							} else {
								r.push(`that force ${him} to move with the care of a heavily pregnant ${woman}.`);
							}
						} else {
							r.push(`a daringly high platform heel so tall ${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "stretch pants and a crop-top":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of comfortable sandals.`);
						} else {
							r.push(`a comfortable sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of comfortable slip on boots.`);
						} else {
							r.push(`a comfortable slip on boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of comfortable heels.`);
						} else {
							r.push(`a comfortable heel`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of comfortable pumps.`);
						} else {
							r.push(`a comfortable heel`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of daringly high heels.`);
						} else {
							r.push(`a daringly high heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of comfortable platform shoes.`);
						} else {
							r.push(`a comfortable platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of comfortable platform heels.`);
						} else {
							r.push(`a comfortable platform heel`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of daringly high platform heels`);
						} else {
							r.push(`a daringly high heel`);
						}
						r.push(`so tall`);
						if (canStand(slave)) {
							r.push(`that ${he} must stick ${his} ass out to stand.`);
							if (slave.weight > 95) {
								r.push(`This has the lovely effect of allowing ${his} gut to hang heavily from ${his} body.`);
							}
						} else {
							r.push(`${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a succubus outfit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`Grecian sandals.`);
						} else {
							r.push(`a Grecian sandal`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`colored leather boots that come most of the way up ${his} thighs.`);
						} else {
							r.push(`a colored leather boot that comes most of the way up ${his} thigh.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`colored stiletto heels.`);
						} else {
							r.push(`a colored stiletto heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`colored stiletto pumps.`);
						} else {
							r.push(`a colored stiletto heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`tall boots that make ${his} feet look like hooves.`);
						} else {
							r.push(`a tall boot that makes ${his} foot look like a hoof.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`shoes with hoof-like platforms.`);
						} else {
							r.push(`a shoe with a hoof-like platform.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`colored stiletto platform heels.`);
						} else {
							r.push(`a colored stiletto heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`towering platform heels that make ${his} feet look like hooves.`);
						} else {
							r.push(`a towering stiletto heel that makes ${his} foot look like a hoof.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a chattel habit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of gold sandals with thin straps that run up ${his} calves.`);
						} else {
							r.push(`a pair of gold sandals with this straps that run up ${his} calf.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`white leather boots that run most of the way up ${his} thighs.`);
						} else {
							r.push(`a white leather boot that runs most of the way up ${his} thigh.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of gold heels secured by thin straps that run up ${his} calves.`);
						} else {
							r.push(`a gold heel secured by thin straps that run up ${his} calf.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of gold pumps secured by thin straps that run up ${his} calves.`);
						} else {
							r.push(`a gold heel secured by thin straps that run up ${his} calf.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of white leather stripper heels secured by thin golden straps that run up ${his} calves.`);
						} else {
							r.push(`a white leather stripper heel secured by thin golden straps that run up ${his} calf.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of gold platform sandals with thin straps that run up ${his} calves.`);
						} else {
							r.push(`a gold platform sandal with thin straps that run up ${his} calf.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of gold platform heels secured by thin straps that run up ${his} calves.`);
						} else {
							r.push(`a gold platform heel secured by thin straps that run up ${his} calf.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of white leather platform stripper heels secured by thin golden straps that run up ${his} calves.`);
						} else {
							r.push(`a white leather platform stripper heel secured by thin golden straps that run up ${his} calf.`);
						}
						break;
					default:
						r.push(`nothing for ${his} ${feet}.`);
				}
				break;
			case "a penitent nuns habit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of scratchy rope sandals.`);
						} else {
							r.push(`a scratchy rope sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of ill-fitting old boots.`);
						} else {
							r.push(`an ill-fitted boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of utilitarian heels.`);
						} else {
							r.push(`a utilitarian heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of utilitarian pumps.`);
						} else {
							r.push(`a utilitarian heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of heels designed`);
						} else {
							r.push(`a heel`);
						}
						r.push(`as religious torment.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of weighted platform shoes.`);
						} else {
							r.push(`a weighted platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of utilitarian platform heels`);
						} else {
							r.push(`a utilitarian platform heel`);
						}
						r.push(`with built-in weights.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of tortuously high platform heels`);
						} else {
							r.push(`a tortuously high platform heel`);
						}
						r.push(`complete with built-in weights.`);
						break;
					default:
						if (bothFeet) {
							r.push(`feet left bare on the cold ground.`);
						} else {
							r.push(`${his} foot left bare on the cold ground.`);
						}
				}
				break;
			case "a string bikini":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of thong sandals.`);
						} else {
							r.push(`a thong sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of stripper boots with turned-down tops.`);
						} else {
							r.push(`a stripper boot with a turned-down top.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of cheap stripper heels.`);
						} else {
							r.push(`a cheap stripper heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of pole dancing pumps.`);
						} else {
							r.push(`a pole dancing heel`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of stripper heels so tall ${he} has to walk with ${his} ass sticking out.`);
						} else {
							r.push(`a stripper heel so tall ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of pole dancing platforms.`);
						} else {
							r.push(`a pole dancing platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of cheap stripper platform heels.`);
						} else {
							r.push(`a cheap stripper platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels so tall ${he} has to walk with ${his} ass and chest sticking out.`);
						} else {
							r.push(`a platform heel so tall ${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a scalemail bikini":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of leather sandals.`);
						} else {
							r.push(`a leather sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of steel-plated leather boots.`);
						} else {
							r.push(`a steel-plated boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of steel-plated leather heels.`);
						} else {
							r.push(`a steel-plated leather heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of steel-plated leather pumps.`);
						} else {
							r.push(`a steel-plated leather heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of leather heels so tall ${he} has to walk with ${his} ass sticking out.`);
						} else {
							r.push(`a leather heel so tall ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of steel-plated platform boots.`);
						} else {
							r.push(`a steel-plated platform boot.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of steel-plated leather platform heels.`);
						} else {
							r.push(`a steel-plated leather platform heel`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels so tall ${he} has to walk with ${his} ass and chest sticking out.`);
						} else {
							r.push(`a platform heel so tall ${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "striped panties":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of flat trainers.`);
						} else {
							r.push(`a flat trainer.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of high-top trainers.`);
						} else {
							r.push(`a high-top trainer.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of heeled trainers.`);
						} else {
							r.push(`a heeled trainer.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of pump trainers.`);
						} else {
							r.push(`a pump trainer.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of heeled trainers so tall ${he} has to walk rather bouncily.`);
						} else {
							r.push(`a heeled trainer so tall ${he} can't even stand making it a very bad sports shoe.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of platform trainers.`);
						} else {
							r.push(`a platform trainer`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of heeled platform trainers.`);
						} else {
							r.push(`a heeled platform trainer`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of heeled platform trainers so tall ${he} has to walk rather bouncily`);
						} else {
							r.push(`a heeled platform trainer so tall ${he} can't even stand making it a very bad sports shoe.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a cheerleader outfit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of flat trainers.`);
						} else {
							r.push(`a flat trainer.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of high-top trainers.`);
						} else {
							r.push(`a high-top trainer.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of heeled trainers.`);
						} else {
							r.push(`a heeled trainer.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of pump trainers.`);
						} else {
							r.push(`a pump trainer.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of heeled trainers so tall ${he} has to walk rather bouncily.`);
						} else {
							r.push(`a heeled trainer so tall ${he} can't even stand making it a very bad sports shoe.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of platform trainers.`);
						} else {
							r.push(`a platform trainer`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of heeled platform trainers.`);
						} else {
							r.push(`a heeled platform trainer`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of heeled platform trainers so tall ${he} has to give everyone a view up ${his} skirt trying to balance.`);
						} else {
							r.push(`a heeled platform trainer so tall it's impossible for ${him} to stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "clubslut netting":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of surprisingly sturdy flats`);
						} else {
							r.push(`a surprisingly sturdy flat shoe`);
						}
						r.push(`for dancing in a crowd.`);
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of tall, comfortable leather boots`);
						} else {
							r.push(`a tall, comfortable leather boot`);
						}
						r.push(`to dance in.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of comfortable heels`);
						} else {
							r.push(`a comfortable heel`);
						}
						r.push(`to dance in.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of comfortable pumps`);
						} else {
							r.push(`a comfortable heel`);
						}
						r.push(`to dance in.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of stripper heels so tall ${he} has to walk rather bouncily.`);
						} else {
							r.push(`a stripper heel so tall ${he} can only dance while holding on to someone.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of solid platform shoes`);
						} else {
							r.push(`a solid platform shoe`);
						}
						r.push(`fit for the disco floor.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of surprisingly sturdy platform heels`);
						} else {
							r.push(`a surprisingly sturdy platform heel`);
						}
						r.push(`to dominate the disco floor.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of daringly tall disco heels that make`);
						} else {
							r.push(`a daringly tall disco heel that makes`);
						}
						r.push(`${him} stand out on the dance floor.`);
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "cutoffs and a t-shirt":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`girly sneakers.`);
						} else {
							r.push(`a girly sneaker.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`girly tasseled boots.`);
						} else {
							r.push(`a girly tasseled boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`high heeled sneakers.`);
						} else {
							r.push(`a high heeled sneaker.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`girly pump sneakers.`);
						} else {
							r.push(`a girly pump sneaker`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`high heeled sneakers so high ${his} butthole is at perfect dick height.`);
						} else {
							r.push(`a high heeled sneaker so high ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`girly platform shoes.`);
						} else {
							r.push(`a girly platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`girly platform heels.`);
						} else {
							r.push(`a girly platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`high heeled platform shoes so high ${his} butthole is at perfect dick height.`);
						} else {
							r.push(`a high heeled platform shoe so high ${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "spats and a tank top":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of flat sneakers.`);
						} else {
							r.push(`a flat sneaker.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of high-top trainers.`);
						} else {
							r.push(`a high-top trainer.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of heeled trainers.`);
						} else {
							r.push(`a heeled trainer.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of athletic pump trainers.`);
						} else {
							r.push(`an athletic pump trainer.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of heeled trainers so tall ${he} has a lot of trouble running.`);
						} else {
							r.push(`a pair of heeled trainers so tall ${he} can't even stand making it a bad sports shoe.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of trainers with a sturdy platform fit for a jog.`);
						} else {
							r.push(`a trainer with a sturdy platform fit for a jog. If hopping while holding a railing can be called that.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of heeled platform trainers that are`);
						} else {
							r.push(`a heeled platform trainer that is`);
						}
						r.push(`sure to complicate a workout.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of heeled platform trainers so tall ${he} gets a workout just trying to walk.`);
						} else {
							r.push(`a heeled platform trainer so tall ${he} gets a workout just trying to stand.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "slutty business attire":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of kitten heeled flats.`);
						} else {
							r.push(`a kitten heeled flat shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of shiny leather heeled boots.`);
						} else {
							r.push(`a shiny leather heeled boot`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of slim fuck-me heels.`);
						} else {
							r.push(`a slim fuck-me heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of fuck-me pumps.`);
						} else {
							r.push(`a fuck-me heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of spike slingback heels so extreme ${he} has to walk with extreme care.`);
						} else {
							r.push(`a spike slingback heel so extreme ${he} has to crawl everywhere ${he} needs to go.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of shiny leather platform shoes.`);
						} else {
							r.push(`a shiny leather platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of slim fuck-me platform heels.`);
						} else {
							r.push(`a slim fuck-me platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels so extreme ${he} has to walk with an exaggerated sway in ${his} step.`);
						} else {
							r.push(`a platform heel so extreme ${he} has to crawl everywhere ${he} needs to go.`);
						}
						break;
					default:
						if (!bothFeet) {
							r.push("a");
						}
						r.push(`comically bare ${feet}.`);
				}
				break;
			case "nice business attire":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of kitten heeled flats.`);
						} else {
							r.push(`a kitten heeled flat shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of heeled boots,`);
						} else {
							r.push(`a heeled boot,`);
						}
						r.push(`polished to a mirror shine.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of spike boardroom heels.`);
						} else {
							r.push(`a spike boardroom heel`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of spike boardroom pumps.`);
						} else {
							r.push(`a spike boardroom heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of spike boardroom heels so extreme ${he} has to concentrate just to stand.`);
						} else {
							r.push(`a spike boardroom heel so extreme ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of polished leather platform shoes.`);
						} else {
							r.push(`a polished leather platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of polished leather platform heels.`);
						} else {
							r.push(`a polished leather platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of polished leather platform heels so extreme ${he} has to concentrate just to stand.`);
						} else {
							r.push(`a polished leather platform heel so extreme ${he} can't even stand.`);
						}
						break;
					default:
						if (!bothFeet) {
							r.push("a");
						}
						r.push(`ridiculously bare stockinged ${feet}.`);
				}
				break;
			case "a ball gown":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a delicate pair of dancing slippers.`);
						} else {
							r.push(`a delicate dancing slipper.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a dainty pair of heeled booties.`);
						} else {
							r.push(`a dainty heeled boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`an ornate pair of stiletto heels.`);
						} else {
							r.push(`an ornate stiletto heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`an ornate pair of stiletto pumps.`);
						} else {
							r.push(`an ornate stiletto heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`an ornate pair of stiletto heels so extreme ${he} has to concentrate just to stand.`);
						} else {
							r.push(`an ornate stiletto heel so extreme ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a delicate pair of platform shoes.`);
						} else {
							r.push(`a delicate platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`an ornate pair of platform heels.`);
						} else {
							r.push(`an ornate platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`an ornate pair of platform heels so extreme ${he} has to concentrate just to stand.`);
						} else {
							r.push(`an ornate platform heel so extreme ${he} can't even stand.`);
						}
						break;
					default:
						if (!bothFeet) {
							r.push("a");
						}
						r.push(`ridiculously bare stockinged ${feet}.`);
				}
				break;
			case "a halter top dress":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of flat shoes with decorative bows.`);
						} else {
							r.push(`a flat shoe with a decorative bow.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`tights and a flashy pair of evening boots.`);
						} else {
							r.push(`tights and a flashy evening boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`an elegant pair of stiletto heels.`);
						} else {
							r.push(`an elegant stiletto heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`an elegant pair of stiletto pumps.`);
						} else {
							r.push(`an elegant stiletto heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`tights and a pair of stiletto heels so extreme ${he} has to concentrate just to stand.`);
						} else {
							r.push(`tights and a stiletto heel so extreme ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of platform shoes with decorative bows.`);
						} else {
							r.push(`a platform shoe with a decorative bow.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`an elegant pair of platform heels`);
						} else {
							r.push(`an elegant platform heel`);
						}
						r.push(`complete with stiletto.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a narrow pair of platform heels so extreme ${he} has to concentrate just to stand.`);
						} else {
							r.push(`a narrow platform heel so extreme ${he} can't even stand.`);
						}
						break;
					default:
						r.push(`with ${his} ridiculously bare ${feet} in tights.`);
				}
				break;
			case "an evening dress":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of simple, yet elegant, embroidered flats.`);
						} else {
							r.push(`a flat shoe with simple, yet elegant, embroidered design.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a fashionable pair of crushed velvet thigh-high boots.`);
						} else {
							r.push(`a fashionable crushed velvet thigh-high boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a flirty pair of strappy heels.`);
						} else {
							r.push(`a flirty strappy heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`an elegant pair of stiletto pumps.`);
						} else {
							r.push(`an elegant stiletto pump.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`tights and a pair of stiletto heels so extreme ${he} has to concentrate just to stand.`);
						} else {
							r.push(`tights and a stiletto heel so extreme ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of platform shoes with decorative bows.`);
						} else {
							r.push(`a platform shoe with a decorative bow.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`an elegant pair of platform heels`);
						} else {
							r.push(`an elegant platform heel`);
						}
						r.push(`complete with stiletto.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a narrow pair of platform heels so extreme ${he} has to concentrate just to stand.`);
						} else {
							r.push(`a narrow platform heel so extreme ${he} can't even stand.`);
						}
						break;
					default:
						r.push(`${his} ridiculously bare ${feet}.`);
				}
				break;
			case "a mini dress":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`suede flats.`);
						} else {
							r.push(`a suede flat shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`suede thigh-high boots.`);
						} else {
							r.push(`a suede thigh-high boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`suede ankle strap heels.`);
						} else {
							r.push(`a suede ankle strap heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`suede ankle strap pumps.`);
						} else {
							r.push(`a suede ankle strap heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`suede ankle strap heels so tall, ${he} has to walk with ${his} ass sticking out.`);
						} else {
							r.push(`a suede ankle strap heel, ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`suede platform shoes.`);
						} else {
							r.push(`a suede platform heel.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`suede ankle strap platform heels.`);
						} else {
							r.push(`a suede ankle strap platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`suede ankle strap platform heels so tall, ${he} has to walk with ${his} ass sticking out.`);
						} else {
							r.push(`a suede ankle strap platform heel so tall, ${he} can't even stand.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`bare feet.`);
						} else {
							r.push(`a bare foot.`);
						}
				}
				break;
			case "a comfortable bodysuit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of comfortable shoes.`);
						} else {
							r.push(`a comfortable shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of heeled boots.`);
						} else {
							r.push(`a heeled boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of heels.`);
						} else {
							r.push(`a high heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of pumps.`);
						} else {
							r.push(`a heel shoe.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of heels so extreme ${he}'s practically on tiptoe.`);
						} else {
							r.push(`a high heel so extreme ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of platform shoes.`);
						} else {
							r.push(`a platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels.`);
						} else {
							r.push(`a platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels so extreme ${he}'s practically on tiptoe.`);
						} else {
							r.push(`a platform heel so extreme ${he} can't even stand.`);
						}
						break;
					default:
						r.push(`nothing on ${his} ${feet}, each individual toe of which is perfectly wrapped by the bodysuit.`);
				}
				break;
			case "a tube top and thong":
			case "a bra":
			case "a thong":
			case "a tube top":
			case "a striped bra":
			case "striped underwear":
			case "boyshorts":
			case "cutoffs":
			case "panties":
			case "panties and pasties":
			case "pasties":
			case "jeans":
			case "a button-up shirt and panties":
			case "a button-up shirt":
			case "a t-shirt and jeans":
			case "an oversized t-shirt and boyshorts":
			case "an oversized t-shirt":
			case "a t-shirt and panties":
			case "a t-shirt":
			case "a sweater and cutoffs":
			case "a sweater":
			case "a tank-top":
			case "a sweater and panties":
			case "a tank-top and panties":
			case "a t-shirt and thong":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of comfortable shoes.`);
						} else {
							r.push(`a comfortable shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of heeled boots.`);
						} else {
							r.push(`a heeled boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of heels.`);
						} else {
							r.push(`a high heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of pumps.`);
						} else {
							r.push(`a heel shoe.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of heels so extreme ${he}'s practically on tiptoe.`);
						} else {
							r.push(`a high heel so extreme ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of platform shoes.`);
						} else {
							r.push(`a platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels.`);
						} else {
							r.push(`a platform heel`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels so extreme ${he}'s practically on tiptoe.`);
						} else {
							r.push(`a platform heel so extreme ${he} can't even stand.`);
						}
						break;
					default:
						r.push(`nothing on ${his} ${feet}.`);
				}
				break;
			case "a sports bra":
			case "sport shorts and a t-shirt":
			case "sport shorts":
			case "sport shorts and a sports bra":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of athletic shoes.`);
						} else {
							r.push(`an athletic shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of athletic heeled boots.`);
						} else {
							r.push(`an athletic heeled boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of athletic heels.`);
						} else {
							r.push(`an athletic heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of athletic pumps.`);
						} else {
							r.push(`an athletic heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of athletic heels so extreme ${he}'s practically on tiptoe.`);
						} else {
							r.push(`an athletic heel so extreme ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of athletic platform shoes.`);
						} else {
							r.push(`an athletic platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of ankle-supporting platform heels`);
						} else {
							r.push(`an ankle supporting platform heel`);
						}
						r.push(`to protect ${him} from sprains.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of extremely tall, but ankle-supporting, platform heels`);
						} else {
							r.push(`an extremely tall, but ankle supporting, platform heel`);
						}
						r.push(`to protect ${him} from sprains.`);
						break;
					default:
						r.push(`nothing on ${his} ${feet}.`);
				}
				break;
			case "a nice pony outfit":
			case "a slutty pony outfit":
			case "leather pants and pasties":
			case "leather pants":
			case "leather pants and a tube top":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of slutty shoes.`);
						} else {
							r.push(`a slutty shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of slutty heeled boots.`);
						} else {
							r.push(`a slutty heeled boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of slutty heels.`);
						} else {
							r.push(`a slutty heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of slutty pumps.`);
						} else {
							r.push(`a slutty heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of slutty heels so extreme ${he}'s practically on tiptoe.`);
						} else {
							r.push(`a slutty heel so extreme ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of slutty platform shoes.`);
						} else {
							r.push(`a slutty platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of slutty platform heels.`);
						} else {
							r.push(`a slutty platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of slutty platform heels so extreme ${he}'s practically on tiptoe.`);
						} else {
							r.push(`a slutty platform heel so extreme ${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`nothing on ${his} ${feet}.`);
				}
				break;
			case "a leotard":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of athletic shoes.`);
						} else {
							r.push(`an athletic shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of high-topped athletic boots.`);
						} else {
							r.push(`a high-topped athletic boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of high heeled athletic shoes.`);
						} else {
							r.push(`a high heeled athletic shoe.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of athletic pumps.`);
						} else {
							r.push(`an athletic pump heels.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`ballet shoes made to force ${him} to walk en pointe.`);
						} else {
							r.push(`a ballet shoe made so tall ${he} has to crawl wherever ${he} goes.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of athletic platform shoes.`);
						} else {
							r.push(`an athletic platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels that make ${him} look like ${he} is walking en pointe.`);
						} else {
							r.push(`a platform heel that forces ${him} to crawl wherever ${he} goes.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels so unwieldy that every step must be made with the grace of a dancer.`);
						} else {
							r.push(`a platform shoe so unwieldy even crawling requires constant attention as to not fall over.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`nothing on ${his} feet, which are covered by the leotard.`);
						} else {
							r.push(`nothing on ${his} foot, which is covered by the leotard.`);
						}
				}
				break;
			case "a burkini":
			case "a one-piece swimsuit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of open-toed sandals.`);
						} else {
							r.push(`an open-toed sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of colorful rubber boots.`);
						} else {
							r.push(`a colorful rubber boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of waterproof heels.`);
						} else {
							r.push(`a waterproof heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of colorful rubber pumps.`);
						} else {
							r.push(`a colorful rubber heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of extreme yet swim-ready heels.`);
						} else {
							r.push(`an extreme yet swim-ready heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of platform sandals.`);
						} else {
							r.push(`a platform sandal.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of waterproof platform heels.`);
						} else {
							r.push(`a waterproof platform heel`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of extreme yet swim-ready platform heels.`);
						} else {
							r.push(`an extreme yet swim-ready platform heel.`);
						}
						break;
					default:
						r.push(`leaves ${his} ${feet} bare.`);
				}
				break;
			case "a monokini":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of open-toed sandals.`);
						} else {
							r.push(`an open-toed sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of go-go boots.`);
						} else {
							r.push(`a go-go boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of sand-ready heels.`);
						} else {
							r.push(`a sand-ready heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of colorful pumps.`);
						} else {
							r.push(`a colorful heel`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of dangerously tall heels still stable enough to walk through sand.`);
						} else {
							r.push(`a dangerously tall heel still stable enough to walk through sand given some assistance.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of platform sandals.`);
						} else {
							r.push(`a platform sandal.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of platform heels.`);
						} else {
							r.push(`a platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of dangerously tall platform heels.`);
						} else {
							r.push(`a dangerously tall platform heel.`);
						}
						break;
					default:
						r.push(`leaves ${his} ${feet} bare.`);
				}
				break;
			case "an apron":
				switch (slave.shoes) {
					case "flats":
						r.push(`aside from a`);
						if (bothFeet) {
							r.push(`pair of suede flats.`);
						} else {
							r.push(`suede flat shoe.`);
						}
						break;
					case "boots":
						r.push(`aside from a`);
						if (bothFeet) {
							r.push(`pair of suede thigh-high boots.`);
						} else {
							r.push(`suede thigh-high boot.`);
						}
						break;
					case "heels":
						r.push(`aside from a`);
						if (bothFeet) {
							r.push(`pair of suede ankle strap heels.`);
						} else {
							r.push(`suede ankle strap heel.`);
						}
						break;
					case "pumps":
						r.push(`aside from a`);
						if (bothFeet) {
							r.push(`pair of suede ankle strap pumps.`);
						} else {
							r.push(`suede ankle strap heel.`);
						}
						break;
					case "extreme heels":
						r.push(`aside from a`);
						if (bothFeet) {
							r.push(`pair of suede ankle strap heels so tall, ${he} has to walk with ${his} ass sticking out.`);
						} else {
							r.push(`suede ankle strap heel so tall, ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						r.push(`aside from a`);
						if (bothFeet) {
							r.push(`pair of suede platform shoes.`);
						} else {
							r.push(`suede platform shoe.`);
						}
						break;
					case "platform heels":
						r.push(`aside from a`);
						if (bothFeet) {
							r.push(`pair of suede ankle strap platform heels.`);
						} else {
							r.push(`suede ankle strap platform heel.`);
						}
						break;
					case "extreme platform heels":
						r.push(`aside from a`);
						if (bothFeet) {
							r.push(`pair of suede ankle strap platform heels so tall, ${he} has to walk with ${his} ass sticking out and ${his} chest thrust forward.`);
						} else {
							r.push(`suede ankle strap platform heel so tall, ${he} can't stand even with assistance.`);
						}
						break;
					default:
						r.push(`all the way down to ${his} feet.`);
				}
				break;
			case "a Santa dress":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of black slippers.`);
						} else {
							r.push(`a black slipper.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of long black boots.`);
						} else {
							r.push(`a long black boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of black high heels.`);
						} else {
							r.push(`a black thigh high heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of black pumps.`);
						} else {
							r.push(`a black heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of dangerously tall black high heels.`);
						} else {
							r.push(`a dangerously tall black high heel`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of black platform shoes`);
						} else {
							r.push(`a black platform shoe`);
						}
						r.push(`with built-in jingle bells.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of black platform heels`);
						} else {
							r.push(`a black platform heel`);
						}
						r.push(`with built-in jingle bells.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of dangerously tall black platform heels`);
						} else {
							r.push(`a dangerously tall black platform heel`);
						}
						r.push(`with built-in jingle bells.`);
						break;
					default:
						r.push(`nothing on ${his} ${feet}.`);
				}
				break;
			case "a cybersuit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of short rubberized combat boots.`);
						} else {
							r.push(`a short rubberized combat boot.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of rubberized combat boots.`);
						} else {
							r.push(`a rubberized combat boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of rubberized heels,`);
						} else {
							r.push(`a rubberized heel,`);
						}
						r.push(`accentuating ${his} ass.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of rubberized pumps,`);
						} else {
							r.push(`a rubberized heel,`);
						}
						r.push(`accentuating ${his} ass.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair dangerously tall rubberized heels.`);
						} else {
							r.push(`a dangerously tall, rubberized heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of rubberized platform boots.`);
						} else {
							r.push(`a rubberized platform boot.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of rubberized platform heels,`);
						} else {
							r.push(`a rubberized platform heel,`);
						}
						r.push(`accentuating ${his} ass.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair dangerously tall rubberized heels, forcing ${him} to stick out ${his} ass.`);
						} else {
							r.push(`a dangerously tall rubberized heel, forcing ${him} to crawl where ${he} needs to go.`);
						}
						break;
					default:
						r.push(`leaves ${his} ${feet} bare.`);
				}
				break;
			case "a tight Imperial bodysuit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of short rubberized combat boots.`);
						} else {
							r.push(`a short rubberized combat boot.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of rubberized combat boots.`);
						} else {
							r.push(`a rubberized combat boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of rubberized heels,`);
						} else {
							r.push(`a rubberized heel,`);
						}
						r.push(`accentuating ${his} bodysuited ass.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of rubberized pumps,`);
						} else {
							r.push(`a rubberized heel,`);
						}
						r.push(`accentuating ${his} bodysuited ass.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair dangerously tall rubberized heels.`);
						} else {
							r.push(`a dangerously tall rubberized heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of rubberized platform boots.`);
						} else {
							r.push(`a rubberized platform boot.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of rubberized platform heels,`);
						} else {
							r.push(`a rubberized platform heel,`);
						}
						r.push(`accentuating ${his} bodysuited ass.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair dangerously tall rubberized heels, forcing ${him} to stick out ${his} bodysuited ass.`);
						} else {
							r.push(`a dangerously tall rubberized heel, forcing ${him} to crawl wherever ${he} needs to go.`);
						}
						break;
					default:
						r.push(`leaves ${his} ${feet} bare.`);
				}
				break;
			case "a bunny outfit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`kitten-heeled strap sandals.`);
						} else {
							r.push(`a kitten-heeled strap sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`high heeled boots that match ${his} teddy.`);
						} else {
							r.push(`a high heeled boot that matches ${his} teddy.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`high heels that match ${his} teddy.`);
						} else {
							r.push(`a high heel that matches ${his} teddy.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`high pumps that match ${his} teddy.`);
						} else {
							r.push(`a high heel that matches ${his} teddy.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`painfully high heels that match ${his} teddy.`);
						} else {
							r.push(`a painfully high heel that matches ${his} teddy.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`platform shoes that match ${his} teddy.`);
						} else {
							r.push(`a platform shoe that matches ${his} teddy.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`platform heels that match ${his} teddy.`);
						} else {
							r.push(`a platform heel that matches ${his} teddy.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`painfully tall platform heels that match ${his} teddy.`);
						} else {
							r.push(`a painfully tall platform heel that matches ${his} teddy.`);
						}
						break;
					default:
						r.push(`${his} bare ${feet}.`);
				}
				break;
			case "a slutty maid outfit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`little black shoes.`);
						} else {
							r.push(`a little black shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`rubber work boots`);
						} else {
							r.push(`a rubber work boot`);
						}
						r.push(`for mopping the floor.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`little sleek heels.`);
						} else {
							r.push(`a little sleek heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`little sleek pumps.`);
						} else {
							r.push(`a little sleek heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`black pump heels that raise`);
						} else {
							r.push(`a black pump heel that raises`);
						}
						r.push(`${his} practically bare butt to dick height.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`rubber platform shoes to keep ${his} feet`);
						} else {
							r.push(`a rubber platform shoe to keep ${his} foot`);
						}
						r.push(`off the floors.`);
						if (!canStand(slave)) {
							r.push(`However, given ${his} inability to stand everything else does touch the floor.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`sleek platform heels.`);
						} else {
							r.push(`a sleek platform heel`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`black platform heels that raise ${his} practically bare butt to dick height.`);
						} else {
							r.push(`a black platform heel so tall it makes it impossible for ${him} to stand.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a nice maid outfit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`little black shoes.`);
						} else {
							r.push(`a little black shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`rubber work boots`);
						} else {
							r.push(`a rubber work boot`);
						}
						r.push(`for mopping the floor.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`little sleek heels.`);
						} else {
							r.push(`a little sleek heel`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`little sleek pumps.`);
						} else {
							r.push(`a little sleek heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`black pump heels of inconvenient height.`);
						} else {
							r.push(`a black pump heel of inconvenient height.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`rubber platform shoes to keep ${his} feet off the floors.`);
						} else {
							r.push(`a rubber platform shoe to keep ${his} foot of the floors.`);
						}
						if (!canStand(slave)) {
							r.push(`However, given ${his} inability to stand everything else does touch the floor.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`sleek platform heels.`);
						} else {
							r.push(`a sleek platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`black platform heels that render`);
						} else {
							r.push(`a black platform heel that would render`);
						}
						r.push(`even the highest shelf quite dustable.`);
						if (!bothFeet) {
							r.push(`If ${he} could stand that is.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a slutty nurse outfit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`white flat shoes.`);
						} else {
							r.push(`a white flat shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`white leather boots that come up ${his} thighs to`);
						} else {
							r.push(`a white leather boot that comes up ${his} thigh to`);
						}
						if (V.showInches === 2) {
							r.push(`an inch`);
						} else {
							r.push(`three centimeters`);
						}
						r.push(`below the hem of ${his} skirt.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`white fuck-me heels.`);
						} else {
							r.push(`a white fuck-me heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`white low heeled pumps.`);
						} else {
							r.push(`a white low heeled heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`white pump heels so tall ${he} can barely totter along.`);
						} else {
							r.push(`a white pump heel ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`white platform shoes`);
						} else {
							r.push(`a white platform shoe`);
						}
						r.push(`emblazoned with crosses.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`white platform heels`);
						} else {
							r.push(`a white platform heel`);
						}
						r.push(`emblazoned with crosses.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`white platform heels so tall ${he} can barely totter along.`);
						} else {
							r.push(`a white platform heel so tall ${he} can't even stand`);
						}
						break;
					default:
						r.push(`bare ${feet}.`);
				}
				break;
			case "a nice nurse outfit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`practical white nursing clogs.`);
						} else {
							r.push(`a practical white nursing clog.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`white leather boots underneath ${his} pant legs.`);
						} else {
							r.push(`a white leather boot underneath ${his} pant leg.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`modest white heels.`);
						} else {
							r.push(`a modest white heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`modest white pumps.`);
						} else {
							r.push(`a modest white heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`impractically high heeled white pumps.`);
						} else {
							r.push(`an impractically high heeled white heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`modest white platform shoes.`);
						} else {
							r.push(`a modest white platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`modest white platform heels.`);
						} else {
							r.push(`a modest white platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`impractically high white platform heels.`);
						} else {
							r.push(`an impractically high white platform heel.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`disposable foot covers over socks.`);
						} else {
							r.push(`a disposable foot cover over a sock.`);
						}
				}
				break;
			case "a schoolgirl outfit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`girly tennis shoes`);
						} else {
							r.push(`a girly tennis shoe`);
						}
						r.push(`with bright white laces.`);
						break;
					case "boots":
						if (bothFeet) {
							r.push(`brown leather riding boots with buckled tops.`);
						} else {
							r.push(`a brown leather riding boot with a buckled top.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`black heels with little plaid bows.`);
						} else {
							r.push(`a black heel with a little plaid bow.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`black pumps with little plaid bows.`);
						} else {
							r.push(`a black heel with a little plaid bow.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`tall black pump heels with little plaid bows.`);
						} else {
							r.push(`a tall pump heel with a little plaid bow.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`girly platform shoes with bright white laces.`);
						} else {
							r.push(`a girly platform shoe with a bright white lace.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`black platform heels with little plaid bows.`);
						} else {
							r.push(`a black platform shoe with a little plaid bow.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`tall black platform heels that force ${him} to walk with ${his} ass sticking out.`);
						} else {
							r.push(`a tall black platform heel that forces ${him} to crawl everywhere ${he} needs to go.`);
						}
						break;
					default:
						r.push(`bare ${feet}.`);
				}
				break;
			case "a kimono":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`getae over tabi socks.`);
						} else {
							r.push(`a getae over a tabi sock.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`black jika-tabi boots.`);
						} else {
							r.push(`a black jika-tabi boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`tall getae over tabi socks.`);
						} else {
							r.push(`a tall getae over a tabi sock.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`tall getae over tabi socks.`);
						} else {
							r.push(`a tall getae over a tabi sock.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`towering getae over tabi socks.`);
						} else {
							r.push(`a towering getae over tabi socks.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`hardwood platforms over tabi socks.`);
						} else {
							r.push(`a hardwood platform over a tabi sock`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`platform heels carved from hardwood.`);
						} else {
							r.push(`a platform heel carved from hardwood.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`extremely tall platform heels carved from hardwood.`);
						} else {
							r.push(`an extremely tall platform heel carved from hardwood.`);
						}
						break;
					default:
						r.push(`bare ${feet}.`);
				}
				break;
			case "a burqa":
			case "a hijab and abaya":
			case "a niqab and abaya":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`sport a pair of simple black slippers.`);
						} else {
							r.push(`which sports a simple black slipper.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`sport a pair of black leather boots.`);
						} else {
							r.push(`sports a black leather boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`sport a pair of modest black heels.`);
						} else {
							r.push(`sports a modest black heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`sport a pair of modest black pumps.`);
						} else {
							r.push(`sports a modest black heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`sport a pair of immodestly tall black heels.`);
						} else {
							r.push(`sports an immodestly tall black heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`sport a pair of simple black platform shoes.`);
						} else {
							r.push(`sports a simple black platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`sport a pair of modest black platform heels.`);
						} else {
							r.push(`sports a modest black platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`sport a pair of immodestly tall black platform heels.`);
						} else {
							r.push(`sports an immodestly tall black platform heel.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`are totally bare.`);
						} else {
							r.push(`is totally bare.`);
						}
				}
				break;
			case "a klan robe":
			case "a slutty klan robe":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`sport a pair of simple slippers.`);
						} else {
							r.push(`sports a simple slipper.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`sport a pair of leather boots.`);
						} else {
							r.push(`sports a leather boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`sport a pair of modest heels.`);
						} else {
							r.push(`sports a modest heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`sport a pair of modest pumps.`);
						} else {
							r.push(`sports a modest heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`sport a pair of immodestly tall heels.`);
						} else {
							r.push(`sports an immodestly tall heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`sport a pair of simple platform shoes.`);
						} else {
							r.push(`sports a simple platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`sport a pair of modest platform heels.`);
						} else {
							r.push(`sports a modest platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`sport a pair of immodestly tall platform heels.`);
						} else {
							r.push(`sports an immodestly tall platform heel.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`are totally bare.`);
						} else {
							r.push(`is totally bare.`);
						}
				}
				break;
			case "a military uniform":
			case "a police uniform":
			case "a schutzstaffel uniform":
			case "a slutty schutzstaffel uniform":
			case "a red army uniform":
			case "a mounty outfit":
			case "a confederate army uniform":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`polished Oxford shoes.`);
						} else {
							r.push(`a polished Oxford shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`tall black leather boots.`);
						} else {
							r.push(`a tall leather boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`modest black service heels.`);
						} else {
							r.push(`a modest black service heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`modest black service pumps.`);
						} else {
							r.push(`a modest black service heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`extremely high heeled ceremonial dress boots that force ${him} to constantly stand at attention.`);
						} else {
							r.push(`an extremely high heeled ceremonial dress boot that makes it impossible for ${him} to stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`leather service boots`);
						} else {
							r.push(`a leather service boot`);
						}
						r.push(`with a built-in platform.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`modest black service platform heels.`);
						} else {
							r.push(`a modest black service platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`extremely high heeled ceremonial platform dress boots that force ${him} to constantly stand at attention.`);
						} else {
							r.push(`an extremely high heeled ceremonial platform dress boot that makes it impossible for ${him} to stand.`);
						}
						break;
					default:
						r.push(`a complete lack of regulation footwear.`);
				}
				break;
			case "battlearmor":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`polished service shoes.`);
						} else {
							r.push(`a polished service shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`tall combat boots.`);
						} else {
							r.push(`a tall combat boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`modest service heels.`);
						} else {
							r.push(`a modest service heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`modest service pumps.`);
						} else {
							r.push(`a modest service heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`extremely high heeled ceremonial dress boots that force ${him} to constantly stand at attention.`);
						} else {
							r.push(`an extremely high heeled ceremonial dress boot that makes it impossible for ${him} to stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`leather combat boots`);
						} else {
							r.push(`a leather combat boot`);
						}
						r.push(`with a built-in platform.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`modest service platform heels.`);
						} else {
							r.push(`a modest service platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`extremely high heeled ceremonial platform dress boots that force ${him} to constantly stand at attention.`);
						} else {
							r.push(`an extremely high heeled ceremonial platform dress boot that makes it impossible for ${him} to stand.`);
						}
						break;
					default:
						r.push(`a complete lack of regulation footwear.`);
				}
				break;
			case "Imperial Plate":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`flatly armored shoes.`);
						} else {
							r.push(`a flatly armored shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`intimidatingly plated boots.`);
						} else {
							r.push(`an intimidatingly plated boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`plate-armor heels.`);
						} else {
							r.push(`a plate-armor heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`plate-armor pumps.`);
						} else {
							r.push(`a plate-armor heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`comically high plate-armor heels that somehow render`);
						} else {
							r.push(`a comically high plate-armor heel that somehow renders`);
						}
						r.push(`${his} entire ultra-heavy armor far less intimidating.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`platformed, plate-armor boots.`);
						} else {
							r.push(`a platformed, plate-armor boot.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`platformed, plate-armor heels.`);
						} else {
							r.push(`a platformed, plate armor heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`absurdly high platform heels that flash`);
						} else {
							r.push(`an absurdly high platform heel that flashes`);
						}
						r.push(`with integrated cybernetics.`);
						break;
					default:
						if (bothFeet) {
							r.push(`has bare feet that awkwardly stand`);
						} else {
							r.push(`has a bare foot that awkwardly stands`);
						}
						r.push(`as the only piece of exposed flesh on ${his} entire heavily-armored body.`);
				}
				break;
			case "a long qipao":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`polished oriental flats.`);
						} else {
							r.push(`a polished oriental flat shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`tall oriental boots.`);
						} else {
							r.push(`a tall oriental boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`modest oriental heels.`);
						} else {
							r.push(`a modest oriental heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`modest oriental pumps.`);
						} else {
							r.push(`a modest oriental heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`extremely high heeled oriental boots.`);
						} else {
							r.push(`an extremely high heeled oriental boot.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`polished platform shoes`);
						} else {
							r.push(`a polished platform shoe`);
						}
						r.push(`with an oriental design.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`modest oriental platform heels.`);
						} else {
							r.push(`a modest oriental platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`extreme platform heels`);
						} else {
							r.push(`an extreme platform heel`);
						}
						r.push(`with intricate oriental designs.`);
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a gothic lolita dress":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`polished Victorian flats.`);
						} else {
							r.push(`a polished Victorian shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`tall Victorian boots.`);
						} else {
							r.push(`a tall Victorian boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`modest Victorian heels.`);
						} else {
							r.push(`a modest Victorian heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`modest Victorian pumps.`);
						} else {
							r.push(`a modest Victorian heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`extremely high heeled Victorian boots.`);
						} else {
							r.push(`an extremely high heeled Victorian boot.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`platform shoes`);
						} else {
							r.push(`a platform shoe`);
						}
						r.push(`with a Victorian flair.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`platform heels`);
						} else {
							r.push(`a platform heel`);
						}
						r.push(`with a Victorian flair.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`tall platform heels`);
						} else {
							r.push(`a tall platform heel`);
						}
						r.push(`with a Victorian flair.`);
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a dirndl":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`polished traditional laced shoes.`);
						} else {
							r.push(`a polished laced shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`tall traditional laced boots.`);
						} else {
							r.push(`a tall traditional laced shoe.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`modest traditional laced heels.`);
						} else {
							r.push(`a modest traditional laced heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`modest traditional laced pumps.`);
						} else {
							r.push(`a modest traditional laced heel.`);
						}

						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of daringly high traditional laced heels.`);
						} else {
							r.push(`a daringly high traditional laced heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`polished traditional laced platform shoes.`);
						} else {
							r.push(`a polished traditional laced platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`modest traditional laced platform heels.`);
						} else {
							r.push(`a modest traditional laced platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of daringly high traditional laced platform heels.`);
						} else {
							r.push(`a daringly high traditional laced platform heel.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "lederhosen":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`polished traditional shoes.`);
						} else {
							r.push(`a polished traditional shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`tall traditional boots.`);
						} else {
							r.push(`a traditional boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`modest traditional heels.`);
						} else {
							r.push(`a modest traditional heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`modest traditional pumps.`);
						} else {
							r.push(`a modest traditional heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of daringly high traditional heels.`);
						} else {
							r.push(`a daringly high traditional heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`polished traditional laced platform shoes.`);
						} else {
							r.push(`a polished traditional laced platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`modest traditional platform heels.`);
						} else {
							r.push(`a modest traditional platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of daringly high traditional platform heels.`);
						} else {
							r.push(`a daringly high traditional platform heel.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "a biyelgee costume":
			case "a hanbok":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`ornamental dancing shoes.`);
						} else {
							r.push(`an ornamental dancing shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`bright sturdy boots.`);
						} else {
							r.push(`a bright sturdy boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`bright ornamental heels.`);
						} else {
							r.push(`a bright ornamental heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`bright ornamental pumps.`);
						} else {
							r.push(`a bright ornamental heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`extremely high heeled ornamental dress boots that force ${him} to constantly rock ${his} hips to shift ${his} weight.`);
						} else {
							r.push(`an extremely high heeled ornamental dress boot that makes it impossible for ${him} to stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`bright ornamental platform shoes.`);
						} else {
							r.push(`a bright ornamental platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`bright ornamental platform heels.`);
						} else {
							r.push(`a bright ornamental platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`extremely tall ornamental platform heels that force ${him} to constantly rock ${his} hips to shift ${his} weight.`);
						} else {
							r.push(`an extremely tall ornamental platform heel that makes it impossible for ${him} to stand.`);
						}
						break;
					default:
						r.push(`nothing on ${his} bare ${feet}.`);
				}
				break;
			case "battledress":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`low topped patrol shoes.`);
						} else {
							r.push(`a low topped patrol shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`practical combat boots.`);
						} else {
							r.push(`a practical combat boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`high heeled combat boots.`);
						} else {
							r.push(`a high heeled combat boot.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`pump-like combat boots.`);
						} else {
							r.push(`a pump-like combat boot.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`combat boots with heels`);
						} else {
							r.push(`a combat boot with a heel`);
						}
						r.push(`so tall as to almost immobilize ${him}.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`sturdy platform combat boots.`);
						} else {
							r.push(`a sturdy platform combat boot.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`impractical platform heeled combat boots.`);
						} else {
							r.push(`an impractical platform heeled combat boot.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`combat boots`);
						} else {
							r.push(`a combat boot`);
						}
						r.push(`with a heeled platform so tall that they are practically immobilizing.`);
						break;
					default:
						if (bothFeet) {
							r.push(`bare feet, VC style.`);
						} else {
							r.push(`a bare foot, VC style.`);
						}
				}
				break;
			case "harem gauze":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`jeweled thong sandals.`);
						} else {
							r.push(`a jeweled thong sandal.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`long leather boots`);
						} else {
							r.push(`a long leather boot`);
						}
						r.push(`worked with beautiful golden filigree.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`high heels`);
						} else {
							r.push(`a high heel`);
						}
						r.push(`decorated with golden filigree.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`high pumps`);
						} else {
							r.push(`a high pump`);
						}
						r.push(`decorated with golden filigree.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`extremely high heels`);
						} else {
							r.push(`an extremely high heel`);
						}
						r.push(`decorated with golden filigree.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`platform shoes`);
						} else {
							r.push(`a platform shoe`);
						}
						r.push(`with beautiful eastern patterns worked into the sides in lapis lazuli.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`platform heels`);
						} else {
							r.push(`a platform heel`);
						}
						r.push(`with beautiful eastern patterns worked into the sides in lapis lazuli.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`tall platform heels`);
						} else {
							r.push(`a tall platform heel`);
						}
						r.push(`with beautiful eastern patterns worked into the sides in lapis lazuli.`);
						break;
					default:
						r.push(`${his} alluringly bare ${feet}.`);
				}
				break;
			case "slutty jewelry":
				switch (slave.shoes) {
					case "flats":
						r.push(`connect to the thin straps of a`);
						if (bothFeet) {
							r.push(`pair of sandals`);
						} else {
							r.push(`sandal`);
						}
						r.push(`of the same golden chain.`);
						break;
					case "boots":
						if (bothFeet) {
							r.push(`crisscross ${his} thighs and calves down to a pair of soles to form boots`);
						} else {
							r.push(`crisscross ${his} thigh and calf down to a sole to form a boot`);
						}
						r.push(`of golden chains.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`crisscross ${his} thighs and calves down to a pair of golden heels.`);
						} else {
							r.push(`crisscross ${his} thigh and calf down to a golden heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`crisscross ${his} thighs and calves down to a pair of golden pumps.`);
						} else {
							r.push(`crisscross ${his} thigh and calf down to a golden heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`crisscross ${his} thighs and calves down to a pair of excruciatingly high golden heels.`);
						} else {
							r.push(`crisscross ${his} thigh and calf down to an excruciatingly high golden heel.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`crisscross ${his} thighs and calves down to a pair of golden platforms.`);
						} else {
							r.push(`crisscross ${his} thigh and calf down to a golden platform shoes.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`crisscross ${his} thighs and calves down to a pair of golden platform heels.`);
						} else {
							r.push(`crisscross ${his} thigh and calf down to a golden platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`crisscross ${his} thighs and calves down to a pair of excruciatingly high golden platform heels.`);
						} else {
							r.push(`crisscross ${his} thigh and calf down to an excruciatingly high golden platform heel.`);
						}
						break;
					default:
						r.push(`end at mid-calf, leaving ${his} ${feet} bare except for a set of jeweled toe-rings.`);
				}
				break;
			case "a courtesan dress":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`wearing an elegant pair of dancing slippers.`);
						} else {
							r.push(`wearing an elegant dancing slipper.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`wearing an elegant pair of heeled booties.`);
						} else {
							r.push(`wearing an elegant heeled boot.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`wearing an elegant pair of heels.`);
						} else {
							r.push(`wearing an elegant heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`wearing an elegant pair of pumps.`);
						} else {
							r.push(`wearing an elegant heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`wearing an elegant pair of excruciatingly high heels that test ${his} grace.`);
						} else {
							r.push(`wearing an elegant, excruciatingly high heel that makes it impossible for ${him} to stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`wearing a fragile pair of platform shoes.`);
						} else {
							r.push(`wearing a fragile platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`wearing a fragile pair of platform heels.`);
						} else {
							r.push(`wearing a fragile platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`wearing a fragile pair of excruciatingly high platform heels that test ${his} focus with each step.`);
						} else {
							r.push(`wearing a fragile, excruciatingly high platform heel that makes it impossible for ${him} to stand.`);
						}
						break;
					default:
						r.push(`elegantly bare footed.`);
				}
				break;
			case "a bimbo outfit":
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`pink flat shoes.`);
						} else {
							r.push(`a pink flat shoe.`);
						}
						break;
					case "boots":
						if (bothFeet) {
							r.push(`leather boots that come up ${his} knees.`);
						} else {
							r.push(`a leather boot that comes up ${his} knee.`);
						}
						break;
					case "heels":
						if (bothFeet) {
							r.push(`pink fuck-me heels.`);
						} else {
							r.push(`a pink fuck-me heel.`);
						}
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`pink low heeled pumps.`);
						} else {
							r.push(`a pink low heeled heel.`);
						}
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`pink heels so tall ${he} has to push ${his} ass out and ${his} chest forward just to keep balance.`);
						} else {
							r.push(`a pink heel so tall ${he} can't even stand.`);
						}
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`pink platform shoes.`);
						} else {
							r.push(`a pink platform shoe.`);
						}
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`pink platform heels.`);
						} else {
							r.push(`a pink platform heel.`);
						}
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`pink platform heels so tall ${he} has to push ${his} ass out and ${his} chest forward just to keep balance.`);
						} else {
							r.push(`a pink platform heel so tall ${he} can't stand even with assistance.`);
						}
						break;
					default:
						if (bothFeet) {
							r.push(`bare feet.`);
						} else {
							r.push(`a bare foot.`);
						}
				}
				break;
			default:
				switch (slave.shoes) {
					case "flats":
						if (bothFeet) {
							r.push(`a pair of simple sandals which just call`);
						} else {
							r.push(`a simple sandal which just calls`);
						}
						r.push(`attention to ${his} otherwise nude state.`);
						break;
					case "boots":
						if (bothFeet) {
							r.push(`a pair of sexy leather boots which just call`);
						} else {
							r.push(`a sexy leather boot which just calls`);
						}
						r.push(`attention to ${his} otherwise nude state.`);
						break;
					case "heels":
						if (bothFeet) {
							r.push(`a pair of sexy heels which just call`);
						} else {
							r.push(`a sexy heel which just calls`);
						}
						r.push(`attention to ${his} otherwise nude state.`);
						break;
					case "pumps":
						if (bothFeet) {
							r.push(`a pair of sexy pumps which just call`);
						} else {
							r.push(`a sexy heel which just calls`);
						}
						r.push(`attention to ${his} otherwise nude state.`);
						break;
					case "extreme heels":
						if (bothFeet) {
							r.push(`a pair of daringly high heels which just call`);
						} else {
							r.push(`a daringly high heel which just calls`);
						}
						r.push(`attention to ${his} otherwise nude state.`);
						break;
					case "platform shoes":
						if (bothFeet) {
							r.push(`a pair of simple platform shoes which just call`);
						} else {
							r.push(`a simple platform shoe which just calls`);
						}
						r.push(`attention to ${his} otherwise nude state.`);
						break;
					case "platform heels":
						if (bothFeet) {
							r.push(`a pair of sexy platform heels which just call`);
						} else {
							r.push(`a sexy platform heel which just calls`);
						}
						r.push(`attention to ${his} otherwise nude state.`);
						break;
					case "extreme platform heels":
						if (bothFeet) {
							r.push(`a pair of daringly high platform heels which just call`);
						} else {
							r.push(`a daringly high platform heel which just calls`);
						}
						r.push(`attention to ${his} otherwise nude state.`);
						break;
					default:
						r.push(`nothing on ${his} bare ${feet} either, naturally.`);
				}
		}

		switch (slave.legAccessory) {
			// split stocking descriptions from above into here
			// I think these need to be integrated into the above switch statement and placed prior to the shoe descriptions
			case "short stockings":
				switch (slave.clothes) {
					case "no clothing":
					case "an apron":
					case "a thong":
					case "a skimpy loincloth":
					case "body oil":
					case "boyshorts":
					case "panties":
					case "panties and pasties":
						if (hasBothLegs(slave)) {
							r.push(`${He} is wearing a pair of short${slave.collar === "leather with cowbell" ? " cow print" : ""} stockings that end just below ${his} knees.`);
						} else {
							r.push(`${He} is wearing a short${slave.collar === "leather with cowbell" ? " cow print" : ""} stocking that ends just below ${his} knee.`);
						}
						break;
					default:
						if (hasBothLegs(slave)) {
							r.push(`${He} is wearing a pair of short stockings that end just below ${his} knees.`);
						} else {
							r.push(`${He} is wearing a short stocking that ends just below ${his} knee.`);
						}
				}
				break;
			case "long stockings":
				switch (slave.clothes) {
					case "no clothing":
					case "an apron":
					case "a thong":
					case "a skimpy loincloth":
					case "boyshorts":
					case "body oil":
					case "panties":
					case "panties and pasties":
						if (hasBothLegs(slave)) {
							r.push(`${He} is wearing a pair of long${slave.collar === "leather with cowbell" ? " cow print" : ""} stockings that come up to the middle of ${his} thighs.`);
						} else {
							r.push(`${He} is wearing a long${slave.collar === "leather with cowbell" ? " cow print" : ""} stocking that come up to the middle of ${his} thigh.`);
						}
						break;
					default:
						if (hasBothLegs(slave)) {
							r.push(`${He} is wearing a pair of long stockings that come up to the middle of ${his} thighs.`);
						} else {
							r.push(`${He} is wearing a long stocking that come up to the middle of ${his} thigh.`);
						}
				}
				break;
		}
	}
	// end amp check

	return r.join(" ");
};
