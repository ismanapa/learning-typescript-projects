type AvailableResource = "water" | "food" | undefined;

function randomIntFromInterval(min: number, max: number) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function runCommandsOld() {
	// Declare your variables and runtime logic here! ✨
	let day = 0;
	const player = {
		food: 5,
		water: 5,
		increase(resource: NonNullable<AvailableResource>, amount: number) {
			this[resource] += amount;
		},
		consume() {
			this.food--;
			this.water--;
		},
		isAlive() {
			return this.food > 0 && this.water > 0;
		},
	};
	let availableResource: AvailableResource = undefined;

	while (day < 7 && player.isAlive()) {
		const diceRoll = randomIntFromInterval(1, 6);

		if (diceRoll === 1) {
			availableResource = "food";
		} else if (diceRoll === 2) {
			availableResource = "water";
		} else {
			if (!availableResource) {
				availableResource = diceRoll % 2 === 0 ? "food" : "water";
			} else {
				player.increase(availableResource, diceRoll);
				availableResource = undefined;
			}
		}

		player.consume();
		day++;
	}

	return player.isAlive();
}

export function runCommands() {
	// Declare your variables and runtime logic here! ✨
	let day = 0;
	const player = {
		food: 5,
		water: 5,
		increase(resource: NonNullable<AvailableResource>, amount: number) {
			this[resource] += amount;
		},
		consume() {
			this.food--;
			this.water--;
		},
		isAlive() {
			return this.food > 0 && this.water > 0;
		},
	};
	let availableResource: AvailableResource = undefined;
	let command: "food" | "water" | "resupply";

	while (day < 7 && player.isAlive()) {
		const diceRoll = randomIntFromInterval(1, 6);

		// GetCommandFromDiceRoll
		switch (diceRoll) {
			case 1:
				command = "food";
				break;

			case 2:
				command = "water";
				break;

			default:
				command = "resupply";
				break;
		}

		const commands: { [key in typeof command]: () => void } = {
			food: () => {
				availableResource = "food";
			},
			water: () => {
				availableResource = "water";
			},
			resupply: () => {
				if (!availableResource) {
					availableResource = diceRoll % 2 === 0 ? "food" : "water";
				} else {
					player.increase(availableResource, diceRoll);
					availableResource = undefined;
				}
			},
		};

		commands[command]();

		player.consume();
		day++;
	}

	return player.isAlive();
}
