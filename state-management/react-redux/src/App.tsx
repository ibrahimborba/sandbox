import { Route, Routes } from 'react-router-dom'
import './App.css'
import TickersList from './pages/Ticker/List'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<TickersList/>}/>
    </Routes>
    </>
  )
}

export default App
