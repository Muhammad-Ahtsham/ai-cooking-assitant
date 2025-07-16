import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: null,
  },
  reducers: {
    addRecipe: (state, action) => {
      state.recipes = action.payload;
    },
    updateIngredient: (state, action) => {
      const index = action.payload
      const item = state.recipes.ingredients[index]
      item.isChecked = !item.isChecked
 
    },
  },
});
export default recipeSlice;

export const { addRecipe, updateIngredient } = recipeSlice.actions;
