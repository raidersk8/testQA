interface ReplacementSymbol {
	symbol: string,
	short: string,
};
interface QA {
	question: string,
	answer: string,
};
interface QAList {
	name: string,
	list: QA[],
};