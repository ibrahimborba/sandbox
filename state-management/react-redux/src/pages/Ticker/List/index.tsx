import { useAppDispatch, useAppSelector } from "../../../infra/state/redux/hooks";
import { selectTickersList, getTickersList } from "../../../domain/Ticker/ticker.slice";
import { useEffect } from "react";

export default function TickersList(){
  const dispatch = useAppDispatch()
  const tickersList = useAppSelector(selectTickersList)

  useEffect(() => {
    dispatch(getTickersList())
  }, [dispatch])


  return (
    <>
      <h1>Tickers List</h1>
      <ul>
        {
          tickersList.map(ticker => <li key={ticker.ticker}>{ticker.ticker}</li>)
        }
      </ul>    
    </>
  )
}