import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import tickerReducer from "../../../domain/Ticker/ticker.slice"

export const store = configureStore({
  reducer: {
    ticker: tickerReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>