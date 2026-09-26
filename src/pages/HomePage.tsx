import React from 'react';
import { Hero } from '../components/Hero';
import { DigitalFlavourBook } from '../components/DigitalFlavourBook';
import { ContactSection } from '../components/ContactSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <DigitalFlavourBook onNavigate={onNavigate} />
      <ContactSection onNavigate={onNavigate} />
    </main>
  );
};


