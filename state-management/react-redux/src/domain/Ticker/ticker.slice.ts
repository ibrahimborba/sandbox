import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITicker } from "./ticker.interface";
import { RootState } from "../../infra/state/redux/store";
import { fetchTickersList } from "./ticker.gateways";

const InitialTicker = {
  ticker: '',
  name: '',
  description: '',
  market: '',
  market_cap: null,
  weighted_shares_outstanding: null,
  active: true,
}

interface TickerState {
  tickerDetails: ITicker;
  tickersList: ITicker[];
  status: "idle" | "loading" | "failed";
  error: string | undefined;
}

const initialState: TickerState = {
  tickerDetails: InitialTicker,
  tickersList: [],
  status: "idle",
  error: ''
}

export const getTickersList = createAsyncThunk(
  "ticker/fetchList",
  async () => {
    const payload = await fetchTickersList()
    return payload
  },
)

const tickerSlice = createSlice({
  name: "ticker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getTickersList.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(getTickersList.fulfilled, (state, action) => {
      state.status = 'idle',
      state.tickersList = action.payload
    })
    .addCase(getTickersList.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.status
    })

  }
})

export const selectTickersList  = (state: RootState) => state.ticker.tickersList

export default tickerSlice.reducer