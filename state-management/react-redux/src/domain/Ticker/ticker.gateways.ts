import axios from "axios";

export const fetchTickersList = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_POLYGON}`
    }
  }
  const { data } = await axios.get('https://api.polygon.io/v3/reference/tickers', config)
  return data.results || []
}