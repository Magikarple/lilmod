// cSpell:ignore unintimidating

App.Events.refsDeadBaron = class refsDeadBaron extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSNeoImperialist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
			() => V.arcologies[0].FSNeoImperialistLaw2 === 1,
			() => V.newBaron === 1,
		];
	}

	execute(node) {
		App.Events.addParagraph(node, [`Although the lives of the uber-wealthy last for so long with the heights of modern medicine that some whisper that you are immortal, no one lives forever. Recently, one of your Imperial Barons has passed away, supposedly from natural causes, although it's always possible that the shadowy and underhanded elites a step lower in the hierarchy might have hastened their passing – if that's the case, your Knights will learn of the culprits soon enough. Regardless of the reason, you now have an opening in your noble hierarchy, and as always, there is no shortage of hungry, ambitious elites looking to fill the slot.`]);

		App.Events.addParagraph(node, [`Typically, the position is hereditary; the adult children of a Baron, those had legitimately and not with slaves, expect to inherit the title in an order of seniority. However, this is only precedent, and not the actual legal code; the laws, as you've written them, allow you to assign the title to whoever you please upon the death of the former Baron. You could, undoubtedly, choose to award it to someone else instead of the Baron's children... although doing so would, no doubt, infuriate the influential Baronets, who expect their family to continue to hold its prestigious position.`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Appoint the Baron's firstborn son`, son),
			new App.Events.Result(`Appoint a wealthy executive instead`, executive),
			new App.Events.Result(`Appoint a competent bureaucrat instead`, bureaucrat),
			new App.Events.Result(`Appoint a veteran Knight instead`, knight),
		]);

		function son() {
			repX(500, "event");
			return `You announce with minimal fanfare that the firstborn son of the Baron will be assuming the title, as expected. The announcement is met without surprise, but with some disappointment by powerhungry lesser elites who thought the death of the Baron might have given them a chance at taking the title for themselves. The smug-looking lordling takes his father's band with a smile, and says that his family <span class="reputation inc">appreciates</span> you sticking to tradition and rewarding their family's loyalty.`;
		}

		function executive() {
			cashX(5000, "event");
			V.arcologies[0].prosperity -= 1;
			cashX(-2000, "event");
			repX(-2000, "event");
			return `You select one of your loyal executives, an ultra-wealthy trader within the arcology who made a fortune in the sale of human bodies, for the new Barony. The man, a portly and unintimidating man that hides a razor-sharp mind behind his fat and an expensive suit, smiles full of teeth as you announce your decision to a waiting crowd of elites. After you go through the formalities and hand him the golden band that will represent his symbol of office, he shakes your hand vigorously, still smiling devilishly. The furious baronets, robbed of their title, do their best to obstruct the ceremony, and the decision to take the title from their family causes <span class="reputation dec">fear and concern</span> amongst Barons now insecure of their family's future. The next day, the newly-appointed Baron sends you a platter of expensive gifts and foreign candies, complimented with a <span class="cash inc">massive direct deposit to your bank account.</span> You can't help but feel that such a crafty fox might use his new power to <span class="prosperity dec">corner the market</span> in his barony, though.`;
		}

		function bureaucrat() {
			V.arcologies[0].prosperity += 3;
			cashX(-2000, "event");
			repX(-2000, "event");
			return `You select an unimportant but accomplished bureaucrat within the lower ranks of your administration, one of the cornerstone accountants that keeps the trains running on time. The rail-thin woman is clearly surprised that you'd choose her over a wealthier, more influential elite, but nevertheless accepts the golden band with overflowing joy. The furious baronets, robbed of their title, do their best to obstruct the ceremony, and the decision to take the title from their family causes <span class="reputation dec">fear and concern</span> amongst Barons now insecure of their family's future. Although she may not turn any eyebrows, you can tell without a fact that she'll <span class="prosperity inc">keep your arcology efficient and prosperous</span> – after all, if it collapses, then her "guaranteed" barony vanishes too.`;
		}

		function knight() {
			repX(+2500, "event");
			V.arcologies[0].prosperity++;
			cashX(-2000, "event");
			repX(-2000, "event");
			return `You select one of your Imperial Knights, a heavily scarred and muscular man who bears his rose-and-hawk coat of arms like a purple heart on his broad chest. The grizzled soldier is somewhat taken aback at your decision, but regains his composure almost immediately and accepts the golden band of a Baron with a scarred-over smirk. The furious baronets, robbed of their title, do their best to obstruct the ceremony, and the decision to take the title from their family causes <span class="reputation dec">fear and concern</span> amongst Barons now insecure of their family's future. The ex-Knight takes to his new duty with surprising gusto, and quickly proves himself an <span class="reputation inc">extraordinarily popular figure</span> among the commoners, who see the scarred and athletic figure both as proof that duty is rewarded in your arcology and as an example of what a proper Imperial noble should be – martial, confident, and nearly unbeatable in a duel.`;
		}
	}
};
