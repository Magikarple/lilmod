App.Desc.Player.officeBelly = function(PC = V.PC) {
	const r = [];

	if (PC.preg > 0) {
		if (PC.belly >= 120000) {
			r.push(`Your belly is coated with stretch marks and is taut as a drum; you don't know how much more your poor womb can endure. Kicks can almost constantly be seen dotting its surface. You give it a pat for good measure, only encouraging your ${pregNumberName(PC.pregType, 2)}`);
			r.push(`to squirm in excitement.`);
			if (PC.dick !== 0) {
				r.push(`As your dick hardens under the prostate stimulation, you call for a slave to receive the incoming load.`);
			}
		} else if (PC.belly >= 105000) {
			r.push(`Getting out of your chair is practically a dream at this point. It takes far too much effort to do it on your own and is a little embarrassing to ask help with.`);
		} else if (PC.belly >= 90000) {
			r.push(`You can barely reach around your gravid mass any longer. You've also had to reinforce your chair under your growing weight.`);
		} else if (PC.belly >= 75000) {
			r.push(`Your belly is starting to become worrying; you feel over-filled at all times and your children like to remind you just how stuffed you are.`);
		} else if (PC.belly >= 60000) {
			r.push(`You're definitely having multiples; there is no denying it at this point. All you can do is try to relax and keep trying to stave off the stretch marks.`);
		} else if (PC.belly >= 45000) {
			r.push(`You both look and feel enormous; your belly juts out so much now. You stand no chance of sitting at your desk normally and have taken to angling your chair and belly to the side instead.`);
		} else if (PC.belly >= 30000) {
			r.push(`Your chair has taken to creaking ominously whenever you shift your pregnant bulk while you've taken to keeping your belly uncovered to give it room.`);
		} else if (PC.belly >= 14000) {
			r.push(`You can barely fit before your desk anymore and have had to take measures to accommodate your gravidity.`);
		} else if (PC.belly >= 12000) {
			r.push(`You can barely wrap your arms around your huge pregnant belly, and when you do, your popped navel reminds you just how full you are.`);
		} else if (PC.belly >= 10000) {
			r.push(`Your pregnancy has gotten quite huge; none of your clothes fit it right.`);
		} else if (PC.belly >= 7000) {
			r.push(`Your pregnant belly juts out annoyingly far; just getting dressed is a pain now.`);
		} else if (PC.belly >= 5000) {
			r.push(`Your belly has gotten quite large with child; it is beginning to get the way of sex and business.`);
		} else if (PC.belly >= 1500) {
			r.push(`Your belly is now large enough that there is no hiding it.`);
		} else if (PC.belly >= 500) {
			r.push(`Your belly is rounded by your early pregnancy.`);
		} else if (PC.belly >= 250) {
			r.push(`Your lower belly is beginning to stick out; you're definitely pregnant.`);
		} else if (PC.belly >= 100) {
			r.push(`Your belly is slightly swollen; combined with your missed period, odds are you're pregnant.`);
		} else if (PC.belly < 100) {
			r.push(`Your period hasn't happened in some time; you might be pregnant.`);
		}
		if (PC.preg >= 41) {
			r.push(`You don't know why you even bother getting out of bed; you are overdue and ready to drop at many time, making your life as arcology owner very difficult. You try to relax and enjoy your slaves, but you can only manage so much in this state.`);
		} else if (PC.preg >= 39) {
			r.push(`You feel absolutely massive; your full-term belly makes your life as arcology owner very difficult. You try your best to not wander too far from your penthouse, not with labor and birth so close.`);
		}
	} else if (PC.belly >= 1500) {
		r.push(`Your belly is still very distended from your recent pregnancy.`);
	} else if (PC.belly >= 500) {
		r.push(`Your belly is still distended from your recent pregnancy.`);
	} else if (PC.belly >= 250) {
		r.push(`Your belly is still bloated from your recent pregnancy`);
	} else if (PC.belly >= 100) {
		r.push(`Your belly is still slightly swollen after your recent pregnancy.`);
	}

	return r.join(" ");
};
