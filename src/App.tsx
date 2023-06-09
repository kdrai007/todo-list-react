import { useState, useEffect } from 'react';
import Home from './components/Home'

function App() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleScreenWidth = () => {
    const newScreenWidth = window.innerWidth;
    setScreenWidth(newScreenWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleScreenWidth);
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    };
  }, []);
  return (
    <main className=" h-screen w-screen overflow-y-scroll">
      <Home ScreenWidth={screenWidth} />
    </main>
  )
}

export default App
