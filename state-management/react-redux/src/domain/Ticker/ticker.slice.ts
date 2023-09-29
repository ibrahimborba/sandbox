import { createSlice } from "@reduxjs/toolkit";
import { ITicker } from "./ticker.interface";

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

const tickerSlice = createSlice({
  name: "ticker",
  initialState,
  reducers: {}
})

export default tickerSlice.reducer