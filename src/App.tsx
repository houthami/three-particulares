import { useEffect, useState } from 'react';
import './App.css';
import Home from './view/Home';
import SplashScreen from './view/SplashScreen';
import logo from './assets/data/logo.png';
import { NextIcon } from './assets/data/svgs';
import About from './view/About';

function App() {
  const [isLoading, setIsLoading] = useState(true);   
  useEffect(() => { 
    setTimeout(() => {
      setIsLoading(false);
    }, 2500); 
  }, []);

  /*useEffect(() => {
    if (!isLoading) {
      const container = document.getElementById('container');
      if (container) {
        const handleMouseMove = (e: any) => {
          console.log('Mouse move event:', e);
        };

        container.addEventListener('mousemove', handleMouseMove);

        return () => {
          container.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }else{ 
      
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }}, [isLoading]);*/

  return isLoading ? (
    // If the page is still loading, display the splash screen
    <SplashScreen />
  ) : (
    // If the page has finished loading, display the main content
    <>
      <img className="logo" src={logo} alt="Logo" width={100} height={100} />
      <div id="container"></div>
      <Home /> 
    </>
  );
}

const Page: React.FC<{ page: string }> = ({ page }) => {
  return (
    <>
      {(() => {
        switch (page) {
          case 'home':
            return <Home /> 
          case 'about':
            return <About />
          default:
            return <>default</>;
        }
      })()}
    </>
  );
};


export default App;

