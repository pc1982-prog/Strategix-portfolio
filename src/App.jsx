import React from "react";
import "./index.css";
import { About } from "./components/sections/About.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import Stats from "./components/sections/Stats.jsx";
import { Services } from "./components/sections/Services.jsx";
import { Mission } from "./components/sections/Mission.jsx";
import Work from "./components/sections/Work.jsx";
import Clients from "./components/sections/Clients.jsx";
import Contact from "./components/sections/Contact.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import AIStudio from "./components/sections/AiStudio";

import ServicesSection from "./components/sections/ServicesSection";
import Card from "./components/sections/Card";
import ClientFeedbacks from "./components/sections/Feedback";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Mission />
        <Card />
        <Work />
        <AIStudio />
        <Clients />
        <ClientFeedbacks />
        <ServicesSection />
        <Contact />
      </main>
      <Footer />

    </>
  );
};

export default App;
