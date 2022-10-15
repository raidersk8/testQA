// Символы которые мы заменяем в тексте для корректного парсинга
const replacementSymbols: ReplacementSymbol[] = [
	{
		symbol: '::',
		short: '[doubledvoetochie]',
	},
	{
		symbol: ':',
		short: '[dvoetochie]',
	},
];
export default function parseQA(list: string[]): QA[] {
	return list.map((item: string) => {
		let arr = symbolsToShorts(item).split(':');
		return {
			answer: shortsToSymbols(arr.pop() || ''),
			question: arr.join(':'),
		};
	});
}

function symbolsToShorts(str: string): string {
	let result: string = str;
	replacementSymbols.forEach((item: ReplacementSymbol) => {
		result = result.replaceAll('\\'+item.symbol, item.short);
	});
	return result;
}

function shortsToSymbols(str: string): string {
	let result: string = str;
	replacementSymbols.forEach((item) => {
		result = result.replaceAll(item.short, item.symbol);
	});
	return result;
}
