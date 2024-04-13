Induced NCS:
		The idea is a genetic change that you can't undo, once done. It is an expensive damaging process, and the
		first time it is run many of the secondary sexual characteristics development will reverse strongly:
		including height, hips width, shoulders width, dick or clit size, labia or scrotum size, and breast size.
		In addition, from then on, every week a small chance of shrinking any of these items. In addition, growth
		features (drugs, hormones, food) work at a disadvantage, while growth-reversal features (drugs, hormones,
		food) work at an advantage. Finally, precocious puberty is generically incremented, such that drugs,
		hormones or treatments that advance puberty are heightened while simultaneously drugs, hormones or
		treatments that work against puberty are lowered, with the exception of hormone blockers, which work as
		advertised.

Slaves generated with `.inducedNCS` set to 0, and added to the backwards compatibility.

Purchased only in the black market.
		Implemented a skeleton 'illegal goods' black market patterning it after the existing FS shopping in the
		black market.

Added description in the Encyclopedia.

Updated Surgery, unlike most surgery, can't be applied to unhealthy slaves `(health > 0)`.

Updated Surgery Degradation.

Updated sa Drugs.

Updated sa Hormones.

Updated sa Long Term Effects.

Added NCS youthening.

NCS youthening, NCS will youthen slave appearances towards 8 years old if older, while younger slaves will
simply, not appear to age at all.
1. every slave visually appearing less than 9 will not be affected.
2. visually 45 yrs and over will always look 1 year younger each week.
3. from 44 down to 9, the slave accumulates NCSyouthening points every week building towards a sliding youthening value which starts at 2 weeks for 44, and evenly progresses towards 10 weeks for slaves 12 and under.

Formula, slaves <= 8 are ignored.

Calculate `_youtheningDifference` the slaves visual age less 8, yielding 0 to say 38 or so, more than that will be dealt with further down the line. Take the `_youthDifference` divide by four and add .25 to evenly break into 0 below 9, and 10 at 45, round to int to get the `_youtheningLevel`. Subtract `_youtheningLevel` from 11 to find out the `_youtheningRequirement`

Every week, slaves that appear older than 8 year old lolis or shotas will have their NCSyouthening incremented. Then this youthening is tested against the `_youtheningRequirement`, if at or better, the NCS youthens the slave, and resets the `NCSyouthening`.

Slaves generated with `.NCSyouthening` set to `0`, and added to the backwards compatibility.

