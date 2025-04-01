import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../service/book";
import { studentApi } from "../service/student";
import { circulationApi } from "../service/circulation";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [circulationApi.reducerPath]: circulationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bookApi.middleware,
      studentApi.middleware,
      circulationApi.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
