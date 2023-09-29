import { useState } from "react"
import { ITicker } from "../../../domain/Ticker/ticker.interface";

export default function TickersList(){
  const [tickers] = useState<ITicker[]>([]);
  return (
    <>
      <h1>Tickers List</h1>
      <ul>
        {
          tickers.map(ticker => <li key={ticker.ticker}>{ticker.ticker}</li>)
        }
      </ul>    
    </>
  )
}