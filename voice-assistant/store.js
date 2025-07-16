import { configureStore } from "@reduxjs/toolkit";
import { api } from "./reduxApi/history";
import { userApi } from "./reduxApi/user";
import { messageApi } from "./reduxApi/message";
import recipeSlice from "./src/features/recipe";
import { libraryApi } from "./reduxApi/library";


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
    recipe: recipeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    libraryApi.middleware,
    api.middleware,
    userApi.middleware,
    messageApi.middleware,
  ],
});
