import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchTickersList = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_POLYGON}`
        }
      }
      const response = await axios.get(url, config)
      setData(response.data)
  }
  fetchTickersList()
  }, [url])

  return { data };
}