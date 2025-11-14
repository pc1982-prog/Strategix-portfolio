import React, { useEffect } from 'react';
import './index.css';
import { About } from './components/sections/About.jsx';
import { Hero } from './components/sections/Hero.jsx';
import  Stats  from './components/sections/Stats.jsx';
import  Services  from './components/sections/Services.jsx';
// import Obstacles from './components/sections/Obstacles.jsx';
import Mission from './components/sections/Mission.jsx';
import Work  from './components/sections/Work.jsx';
import { Traction } from './components/sections/Traction.jsx';
import Clients  from './components/sections/Clients.jsx';
import { CTA } from './components/sections/CTA.jsx';
import Contact from './components/sections/Contact.jsx';
import { Header } from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';


 const StrategixWebsite = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
    }
  }, []);

  return (

<>

      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        {/* <Obstacles /> */}
        <Mission />
        <Work />
        <Traction />
        <Clients />
        <CTA />
        <Contact />
      </main>
      <Footer />
   </>
  );
};



export default StrategixWebsite;