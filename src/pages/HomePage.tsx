import React from 'react';
import { Hero } from '../components/Hero';
import { DigitalFlavourBook } from '../components/DigitalFlavourBook';
import { WhatsYourFlavour } from '../components/WhatsYourFlavour';
import { Philosophy } from '../components/Philosophy';
import { IngredientStory } from '../components/IngredientStory';
import { OurStorySection } from '../components/OurStorySection';
import { MadeForEveryMoment } from '../components/MadeForEveryMoment';
import { SocialInstagram } from '../components/SocialInstagram';
import { FinalCTA } from '../components/FinalCTA';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <DigitalFlavourBook onNavigate={onNavigate} />
      <WhatsYourFlavour onNavigate={onNavigate} />
      <Philosophy />
      <IngredientStory />
      <OurStorySection onNavigate={onNavigate} />
      <MadeForEveryMoment />
      <SocialInstagram />
      <FinalCTA onNavigate={onNavigate} />
    </main>
  );
};
