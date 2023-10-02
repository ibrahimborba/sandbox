import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITicker } from "./ticker.interface";
import { useGetTickersList } from "./tickers.gateway";

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
  status: "idle" | "loading" | "failed"
}

const initialState: TickerState = {
  tickerDetails: InitialTicker,
  tickersList: [],
  status: "idle" 
}

export const getTickersList = createAsyncThunk(
  "ticker/fetchList",
  async () => {
    const {tickersList} = useGetTickersList()
    return tickersList
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
    .addCase(getTickersList.rejected, (state) => {
      state.status = 'failed'
    })

  }
})

export default tickerSlice.reducer