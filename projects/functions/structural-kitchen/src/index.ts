type Ingredients = {
	breads: number;
	fruits: number;
	sauces: number;
	vegetables: number;
};

type KitchenState = {
	budget: number;
	dirt: number;
	stock: Ingredients;
};

// I have # much dirt, # budget, # bread(s), # fruit(s), # sauce(s), and # vegetable(s).

type FailureResult = { succeeded: false };

type SuccessResult = { succeeded: true; newStock: Ingredients };

type RecipeResult = SuccessResult | FailureResult;

type Recipe = (ingredients: Ingredients) => RecipeResult;

type Kitchen<T extends KitchenState> = {
	announce: () => `I have ${T["dirt"]} much dirt, ${number} budget, ${T["stock"]["breads"]} bread(s), ${T["stock"]["fruits"]} fruit(s), ${T["stock"]["sauces"]} sauce(s), and ${T["stock"]["vegetables"]} vegetable(s).`;
	clean: (time?: number) => void;
	purchase: (expense: number) => boolean;
	prepare: (recipe: Recipe) => boolean;
};

export type Cleaner = (dirt: number, time?: number) => number;
export type Supplier = (expense: number) => Ingredients;

export function createKitchen(
	budget: number,
	cleaner: Cleaner,
	supplier: Supplier
): Kitchen<KitchenState> {
	const kitchenState: KitchenState = {
		budget,
		dirt: 0,
		stock: {
			breads: 0,
			fruits: 0,
			sauces: 0,
			vegetables: 0,
		},
	};

	return {
		announce() {
			return `I have ${kitchenState.dirt} much dirt, ${kitchenState.budget} budget, ${kitchenState.stock.breads} bread(s), ${kitchenState.stock.fruits} fruit(s), ${kitchenState.stock.sauces} sauce(s), and ${kitchenState.stock.vegetables} vegetable(s).`;
		},
		clean(time) {
			kitchenState.dirt = cleaner(kitchenState.dirt, time);
		},
		purchase(expense) {
			if (expense > kitchenState.budget) {
				return false;
			}
			kitchenState.budget -= expense;
			const newStockItems = supplier(expense);
			kitchenState.stock = {
				breads: kitchenState.stock.breads + newStockItems.breads,
				fruits: kitchenState.stock.fruits + newStockItems.fruits,
				sauces: kitchenState.stock.sauces + newStockItems.sauces,
				vegetables: kitchenState.stock.vegetables + newStockItems.vegetables,
			};
			return true;
		},
		prepare(recipe) {
			if (kitchenState.dirt >= 100) {
				return false;
			}
			kitchenState.dirt += 1;
			const recipeResult = recipe(kitchenState.stock);
			if (recipeResult.succeeded) {
				kitchenState.stock = recipeResult.newStock;
			}
			return recipeResult.succeeded;
		},
	};
}
