import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Routes/Home/Route/Home'

function App() {

  return (
    <main className="bg-black w-full min-h-screen max-h-max">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
