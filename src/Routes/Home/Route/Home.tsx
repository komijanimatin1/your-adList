import Header from '../Components/Header';
import List from '../Components/List';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/themeContext';

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (

    <div>      
      <section className="border-b-2 border-gray-700 pb-4 flex items-center flex-col">
        <Header theme={theme} toggleTheme={toggleTheme} />
      </section>
      <section>
        <h2 className={`text-white text-center font-bold my-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Available Advertisements</h2>
        <List theme={theme} />
      </section>
    </div>
  );
}
