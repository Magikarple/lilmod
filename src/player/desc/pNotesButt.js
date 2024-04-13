App.Desc.Player.pNotesButt = function(PC = V.PC) {
	const r = [];

	if (V.PC.career === "servant") {
		if (V.PC.butt >= 5 && V.PC.balls >= 30) {
			if (V.PC.buttImplant >= 1) {
				r.push(`When you had your dresses tailored you also had to have them make room for your enormous rear. No dress can hide how big and fake it is though.`);
			} else {
				r.push(`When you had your dresses tailored you also had to have them make room for your enormous rear.`);
			}
		} else if (V.PC.butt >= 5) {
			if (V.PC.buttImplant >= 1) {
				r.push(`You had to get your dress let out to contain your enormous rear. It can't hide how big and fake it is though.`);
			} else {
				r.push(`You had to get your dress let out to contain your enormous rear.`);
			}
		} else if (V.PC.butt >= 4) {
			r.push(`Your dress is starting to feel tight around your huge rear.`);
		} else if (V.PC.butt >= 3) {
			r.push(`Your dress is filled out by your big butt.`);
		}
	} else if (V.PC.career === "escort") {
		if (V.PC.dick !== 0) {
			if (V.PC.balls >= 30) {
				if (V.PC.butt >= 5) {
					if (V.PC.buttImplant >= 1) {
						r.push(`Your slutty skirt is also forced to stretch around your enormous rear, making the implants pretty obvious. With both your front and back struggling to get free of your stretchy skirt, it isn't unusual for one or the other to peek out.`);
					} else {
						r.push(`Your slutty skirt is also forced to stretch around your enormous rear, and bending over is basically asking for your skirt to ride up all the way to your hips. With both your front and back struggling to get free of your stretchy skirt, it isn't unusual for one or the other to peek out.`);
					}
				} else if (V.PC.butt >= 4) {
					r.push(`Your huge rear nearly spills out from the bottom of your slutty skirt.`);
				} else if (V.PC.butt >= 3) {
					r.push(`Your slutty skirt is strained by your big butt.`);
				}
			} else {
				if (V.PC.butt >= 5) {
					if (V.PC.buttImplant >= 1) {
						r.push(`You had to get your slutty pants let out to contain your enormous rear. It still feels really tight, however, thanks to the implants.`);
					} else {
						r.push(`You had to get your slutty pants let out to contain your enormous rear. It still overflows scandalously, however.`);
					}
				} else if (V.PC.butt >= 4) {
					r.push(`Your huge rear spills out from the top of your slutty pants.`);
				} else if (V.PC.butt >= 3) {
					r.push(`Your slutty pants are strained by your big butt.`);
				}
			}
		} else {
			if (V.PC.butt >= 5) {
				if (V.PC.buttImplant >= 1) {
					r.push(`Your ass has completely devoured your slutty shorts. You look like you are wearing a thong, leaving your overly`);
					if (V.PC.markings === "freckles") {
						r.push(`round, freckled`);
					} else if (V.PC.markings === "heavily freckled") {
						r.push(`round, heavily freckled`);
					} else {
						r.push(`round`);
					}
					r.push(`cheeks to hang free.`);
					if (V.PC.markings === "freckles") {
						r.push(`Your lower back is covered in a light speckling of freckles alongside your valley of ass cleavage.`);
					} else if (V.PC.markings === "heavily freckled") {
						r.push(`Your freckles are particularly dense across your lower back and valley of ass cleavage.`);
					}
				} else {
					r.push(`Your ass has completely devoured your slutty shorts. You look like you are wearing a thong leaving your`);
					if (V.PC.markings === "freckles") {
						r.push(`freckled`);
					} else if (V.PC.markings === "heavily freckled") {
						r.push(`heavily freckled`);
					}
					r.push(`cheeks to jiggle freely.`);
					if (V.PC.markings === "freckles") {
						r.push(`Your lower back is covered in a light speckling of freckles alongside your valley of ass cleavage.`);
					} else if (V.PC.markings === "heavily freckled") {
						r.push(`Your freckles are particularly dense across your lower back and valley of ass cleavage.`);
					}
				}
			} else if (V.PC.butt >= 4) {
				r.push(`Your slutty shorts are filled to bursting by your rear. Roughly half of your ass is actually in your bottoms, the rest is bulging out scandalously.`);
				if (V.PC.markings === "freckles") {
					r.push(`Your lower back is covered in a light speckling of freckles alongside your ravine of ass cleavage.`);
				} else if (V.PC.markings === "heavily freckled") {
					r.push(`Your freckles are particularly dense across your lower back and ravine of ass cleavage.`);
				}
			} else if (V.PC.butt >= 3) {
				r.push(`Your slutty shorts are strained by your big butt. It spills out every gap it can.`);
				if (V.PC.markings === "freckles") {
					r.push(`Your lower back is covered in a light speckling of freckles alongside your ass cleavage.`);
				} else if (V.PC.markings === "heavily freckled") {
					r.push(`Your freckles are particularly dense across your lower back and ass cleavage.`);
				}
			} else if (V.PC.markings === "freckles") {
				r.push(`Your exposed lower back is covered in a light speckling of freckles.`);
			} else if (V.PC.markings === "heavily freckled") {
				r.push(`Your freckles are particularly dense across your exposed lower back.`);
			}
		}
	} else {
		if (V.PC.dick !== 0) {
			if (V.PC.balls >= 30) {
				if (V.PC.butt >= 5) {
					if (V.PC.buttImplant >= 1) {
						r.push(`Your custom kilt is also forced to stretch around your enormous rear, making the implants pretty obvious. With both your front and back struggling to get free of the restrictive cloth, it isn't unusual for one or the other to peek out.`);
					} else {
						r.push(`Your custom kilt is also forced to stretch around your enormous rear, and bending over is basically asking for it to ride up all the way to your hips. With both your front and back struggling to get free of the restrictive cloth, it isn't unusual for one or the other to peek out.`);
					}
				} else if (V.PC.butt >= 4) {
					r.push(`Your huge rear nearly spills out from the bottom of your custom kilt.`);
				} else if (V.PC.butt >= 3) {
					r.push(`Your custom kilt is strained by your big butt.`);
				}
			} else {
				if (V.PC.butt >= 5) {
					if (V.PC.buttImplant >= 1) {
						r.push(`You had to get your suit pants let out to contain your enormous rear. It does nothing to hide how big and round your asscheeks are, though.`);
					} else {
						r.push(`You had to get your suit pants let out to contain your enormous rear. It can clearly be seen jiggling within them.`);
					}
				} else if (V.PC.butt >= 4) {
					r.push(`Your huge rear threatens to tear apart your suit pants. You'll need to get them let out soon.`);
				} else if (V.PC.butt >= 3) {
					r.push(`Your suit pants are strained by your big butt.`);
				}
			}
		} else {
			if (V.PC.butt >= 5) {
				if (V.PC.buttImplant >= 1) {
					r.push(`Your skirt covers your enormous butt but does nothing to hide its size and shape. You're beginning to show too much leg again; it might be time for a longer skirt.`);
				} else {
					r.push(`Your skirt covers your enormous butt but does nothing to hide its size and fluidity. Your rear is soft enough to fill out your skirt but not lift it up too far; it also translates every motion to the fabric, however.`);
				}
			} else if (V.PC.butt >= 4) {
				r.push(`Your skirt covers your huge butt but does nothing to hide its size; in fact, you've had to start wearing a longer one to make up for the extra surface area.`);
			} else if (V.PC.butt >= 3) {
				r.push(`Your skirt covers your big butt but does nothing to hide its size.`);
			}
		}
	}

	return r.join(" ");
};
