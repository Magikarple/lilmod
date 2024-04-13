declare namespace FC {
    interface Loan {
		/** The lender's name. */
		name: 'bank' | 'shark';
		/** The amount they've lent. */
		principal: number;
		/** The week on which repayment is due. */
		deadline: number;
		/** The number of installments remaining until the full amount is paid. */
		installments: number;
		/** The Annual Percentage Rate. */
		apr: number;
		/** The amount of interest the loan will accumulate. */
		interest: number;
		/** The full amount that will be paid. */
		full: number;
	}

	interface SlaveStatisticData {
		/** ID of relevant slave */
		ID: number,
		slaveName: string,
		customLabel: string,
		income: number,
		adsIncome: number,
		rep: number,
		food: number,
		cost: number,
		customers: number,

		milk?:number,
		cum?:number,
		fluid?:number,
	}
}
