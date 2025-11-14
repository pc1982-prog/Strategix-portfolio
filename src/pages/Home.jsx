import React from 'react';
import Hero from '../components/hero/Hero';
import Services from '../components/services/Services';
import Obstacles from '../components/obstacles/Obstacles';
import Mission from '../components/mission/Mission';
import Clients from '../components/clients/Clients';
import Portfolio from '../components/portfolio/Portfolio';
import Traction from '../components/traction/Traction';
import Team from '../components/team/Team';
import ContactForm from '../components/contact/ContactForm';
import { cta } from '../data/siteContent';

export default function Home(){
  return (
    <div>
      <Hero />
      <section id="about" className="py-20 container">
        <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
        <p className="text-slate-300 max-w-3xl">We are a team of highly skilled Digital Marketing experts who plan and execute goal-oriented campaigns to raise awareness and build brand trust through targeted audience interactions.</p>
      </section>

      <section id="services" className="py-20 container">
        <Services />
      </section>

      <section id="obstacles-1" className="py-20 container">
        <Obstacles variant="a" />
      </section>

      <section id="mission" className="py-20 container">
        <Mission />
      </section>

      <section id="clients" className="py-20 container">
        <Clients />
      </section>

      <section id="work" className="py-20 container">
        <Portfolio />
      </section>

      <section id="obstacles-2" className="py-20 container">
        <Obstacles variant="b" />
      </section>

      <section id="traction" className="py-20 container">
        <Traction />
      </section>

      <section id="team" className="py-20 container">
        <Team />
      </section>

      <section id="cta" className="py-20 container text-center">
        <h2 className="text-3xl font-bold mb-4">{cta.heading}</h2>
        <a href={cta.button.href} className="px-6 py-3 rounded-lg bg-primary text-black font-semibold">{cta.button.label}</a>
      </section>

      <section id="contact" className="py-20 container">
        <h2 className="text-3xl font-bold mb-4">CONTACT</h2>
        <ContactForm />
      </section>
    </div>
  )
}
