import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Routes/Home/Route/Home'
import { useContext } from 'react';
import { ThemeContext } from './context/themeContext';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} w-full min-h-screen max-h-max p-8`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
