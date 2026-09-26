import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 bg-brand-dark min-h-screen text-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-brand-goldLight hover:text-brand-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <ContactSection onNavigate={onNavigate} />
    </div>
  );
};
