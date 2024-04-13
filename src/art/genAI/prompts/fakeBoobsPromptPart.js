App.Art.GenAI.FakeBoobsPromptPart = class FakeBoobsPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (V.aiLoraPack) {
			if(this.slave.boobsImplant >= 1000)
			{
				return `fake tits, <lora:hugefaketits1:1>`;
			} else if(this.slave.boobsImplant >= 900)
			{
				return `fake tits, <lora:hugefaketits1:0.9>`;
			} else if(this.slave.boobsImplant >= 800)
			{
				return `fake tits, <lora:hugefaketits1:0.8>`;
			} else if(this.slave.boobsImplant >= 700)
			{
				return `fake tits, <lora:hugefaketits1:0.7>`;
			} else if(this.slave.boobsImplant >= 600)
			{
				return `fake tits, <lora:hugefaketits1:0.6>`;
			} else if(this.slave.boobsImplant >= 500)
			{
				return `fake tits, <lora:hugefaketits1:0.5>`;
			} else if(this.slave.boobsImplant >= 400)
			{
				return `fake tits, <lora:hugefaketits1:0.4>`;
			} else if(this.slave.boobsImplant >= 300)
			{
				return `fake tits, <lora:hugefaketits1:0.3>`;
			} else if(this.slave.boobsImplant >= 200)
			{
				return `fake tits, <lora:hugefaketits1:0.2>`;
			}
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (V.aiLoraPack) {
			if (!this.slave.boobsImplant == false) {
				return `fake tits`; // Space for negative prompt if needed NG
			}
		}
		return;
	}
};
