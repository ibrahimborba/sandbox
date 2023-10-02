import axios from "axios"
import { useEffect, useState } from "react"
import { ITicker } from "./ticker.interface"

export const useGetTickersList = () => {
  const [tickersList, setTickersList] = useState<ITicker[]>([])

  useEffect(() => {
    const fetchTickersList = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_POLYGON}`
          }
        }
        const response = await axios.get('https://api.polygon.io/v3/reference/tickers', config)
        setTickersList(response.data)
    }
    fetchTickersList()
  }, [])

  return {tickersList}
}