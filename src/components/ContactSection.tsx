import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onNavigate?: (path: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Corporate Gifting',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-brand-dark text-brand-cream relative overflow-hidden select-none border-t border-brand-gold/15">
      
      {/* Ambient Background & Texture */}
      <div className="absolute inset-0 opacity-10 bg-dark-paper pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Architectural Arch Contact Showcase (Inspired by Editorial Reference Layout) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Arched Luxury Frame (True Continuous Domed Arch Top) */}
            <div className="w-full max-w-md bg-brand-espresso/80 border border-brand-gold/30 rounded-t-full rounded-b-3xl pt-14 sm:pt-16 px-8 sm:px-12 pb-10 shadow-2xl relative flex flex-col items-center text-center backdrop-blur-md">
              
              {/* Decorative Star Sparkle on Arch Curve */}
              <div className="absolute top-10 right-8 sm:right-10 text-brand-goldLight opacity-80 animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>

              {/* Brand Emblem Logo Seal */}
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-brand-goldLight via-brand-gold to-brand-roast shadow-gold-glow mb-4 flex items-center justify-center">
                <img
                  src="/assets/logo.jpeg"
                  alt="NuttyBitez Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Sub-brand Title */}
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold block mb-2">
                NUTTYBITEZ • PREMIUM MUNCHING FOREVER
              </span>

              {/* Prominent Editorial Heading */}
              <h2 className="font-serif text-5xl sm:text-6xl font-bold text-brand-cream tracking-tight mb-8">
                Contact Us
              </h2>

              <div className="w-16 h-[1px] bg-gold-gradient mb-8" />

              {/* Vertically Arranged Direct Contact Information */}
              <div className="w-full space-y-6 text-left mb-10">
                
                {/* Phone / WhatsApp */}
                <a
                  href="https://wa.me/918488971879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-2.5 rounded-2xl hover:bg-brand-roast/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0 shadow-md">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-goldLight/80 font-bold block">
                      WhatsApp Line
                    </span>
                    <span className="font-mono text-sm text-brand-cream font-bold group-hover:text-emerald-300 transition-colors">
                      +91 8488971879
                    </span>
                  </div>
                </a>

                {/* Instagram DM */}
                <a
                  href="https://instagram.com/nuttybitez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-2.5 rounded-2xl hover:bg-brand-roast/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center text-brand-goldLight group-hover:scale-105 transition-transform shrink-0 shadow-md">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-goldLight/80 font-bold block">
                      Instagram DM
                    </span>
                    <span className="text-sm font-semibold text-brand-cream group-hover:text-brand-goldLight transition-colors">
                      @nuttybitez
                    </span>
                  </div>
                </a>

                {/* Email Enquiries */}
                <a
                  href="mailto:hello@nuttybitez.com"
                  className="flex items-center gap-4 group p-2.5 rounded-2xl hover:bg-brand-roast/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center text-brand-goldLight group-hover:scale-105 transition-transform shrink-0 shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-goldLight/80 font-bold block">
                      Email Concierge
                    </span>
                    <span className="text-sm font-semibold text-brand-cream group-hover:text-brand-goldLight transition-colors">
                      hello@nuttybitez.com
                    </span>
                  </div>
                </a>

                {/* Brand Origin & Location */}
                <div className="flex items-center gap-4 p-2.5">
                  <div className="w-11 h-11 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center text-brand-goldLight shrink-0 shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-goldLight/80 font-bold block">
                      Artisanal Kitchen
                    </span>
                    <span className="text-xs text-brand-cream/80 font-light leading-snug">
                      Handcrafted in India • Small Batch Dragées
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom "CONNECT WITH US!" Callout */}
              <div className="pt-6 border-t border-brand-gold/20 w-full text-center">
                <a
                  href="https://wa.me/918488971879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold hover:text-brand-goldLight transition-colors inline-flex items-center gap-2 group"
                >
                  <span>CONNECT WITH US!</span>
                  <span className="text-sm transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Business Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-brand-espresso/50 border border-brand-gold/20 shadow-2xl backdrop-blur-md">
              
              <div className="mb-8 space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-gold block">
                  BESPOKE & BULK ORDERS
                </span>
                <h3 className="font-serif text-4xl sm:text-5xl font-bold text-brand-cream tracking-tight">
                  Send us a Message
                </h3>
                <p className="text-brand-cream/70 text-sm font-light">
                  Have a question about our dragées, corporate gifting, or wholesale orders? Fill in your details below.
                </p>
              </div>

              {submitted ? (
                <div className="p-10 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-serif text-3xl font-bold text-brand-cream">Thank You!</h4>
                  <p className="text-sm text-brand-cream/80 max-w-md mx-auto font-light">
                    Your enquiry has been received. Our concierge team will reach out to you on WhatsApp / Email within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient hover:brightness-110 transition-all shadow-md"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/70 font-semibold block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-brand-dark/70 border border-brand-gold/25 text-sm text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/70 font-semibold block">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-brand-dark/70 border border-brand-gold/25 text-sm text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all"
                        placeholder="10 digit mobile"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/70 font-semibold block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-brand-dark/70 border border-brand-gold/25 text-sm text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all"
                      placeholder="yourname@gmail.com"
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/70 font-semibold block">
                      Subject / Enquiry Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-brand-dark/90 border border-brand-gold/25 text-sm text-brand-cream focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 cursor-pointer transition-all"
                    >
                      <option value="Product Enquiry">Product Enquiry</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Corporate Gifting">Festive & Corporate Gifting</option>
                      <option value="Custom Requirement">Custom Requirement</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/70 font-semibold block">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-brand-dark/70 border border-brand-gold/25 text-sm text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all resize-none"
                      placeholder="Tell us about your requirements or jar quantities..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-brand-dark bg-gold-gradient shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
