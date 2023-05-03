// Write your createCipher function here! ✨
// You'll need to export it so the tests can run it.
export type Cipher = (character: string) => string;

export function createCipher(cipher: Cipher) {
	return (text: string) => {
		let secret = "";
		for (const character of text) {
			secret += cipher(character);
		}
		return secret;
	};
}

const createCipher2 = (cipher: Cipher) => (text: string) => {
	let secret = "";
	for (const character of text) {
		secret += cipher(character);
	}
	return secret;
};

createCipher2(() => "")();

const test = (parametro: string) => {
	return parametro + 1;
};

const test2 = (parametro: string) => parametro + 1;
