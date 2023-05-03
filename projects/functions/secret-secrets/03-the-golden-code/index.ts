// Write your createCodeCracker function here! ✨
// You'll need to export it so the tests can run it.
export type Options = {
	attempts: number;
	makeGuess: (text: string, attempt: number) => string;
	validateGuess: (guess: string) => boolean;
};

export function createCodeCracker({
	attempts,
	makeGuess,
	validateGuess,
}: Options): (text: string) => string | undefined {
	return (text: string) => {
		for (let i = 0; i < attempts; i += 1) {
			const guess = makeGuess(text, i);
			if (validateGuess(guess)) {
				return guess;
			}
		}

		return undefined;
	};
}
