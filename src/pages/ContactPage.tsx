import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Instagram, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
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
    <div className="pt-28 pb-24 bg-brand-dark min-h-screen text-brand-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-brand-goldLight hover:text-brand-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold text-brand-cream">
            CONTACT & ENQUIRIES
          </h1>
          <p className="text-brand-cream/70 text-lg font-light">
            Have a question about our dragées, corporate gifting, or wholesale orders? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-brand-espresso border border-brand-gold/30 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-brand-cream border-b border-brand-gold/15 pb-4">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs font-light">
                <a
                  href="https://wa.me/918488971879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest block font-bold text-emerald-400">WhatsApp Order Line</span>
                    <span className="font-mono text-sm text-brand-cream font-bold">+91 8488971879</span>
                  </div>
                </a>

                <a
                  href="https://instagram.com/nuttybitez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-brand-roast/40 border border-brand-gold/20 text-brand-cream hover:border-brand-gold transition-colors"
                >
                  <Instagram className="w-6 h-6 text-brand-goldLight" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest block text-brand-goldLight">Instagram DM</span>
                    <span className="text-sm font-semibold">@nuttybitez</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Business Info Badge */}
            <div className="p-6 rounded-3xl bg-brand-espresso/60 border border-brand-gold/20 space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-widest text-brand-gold block font-bold">
                100% Homegrown Brand
              </span>
              <p className="text-brand-cream/70 leading-relaxed font-light">
                All NuttyBitez dragées are handcrafted in small batches following strict food safety and hygiene protocols.
              </p>
            </div>

          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-brand-espresso border border-brand-gold/30 shadow-2xl space-y-6">
              <h3 className="font-serif text-3xl font-bold text-brand-cream">
                Send us a Message
              </h3>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-2xl font-bold text-brand-cream">Thank You!</h4>
                  <p className="text-xs text-brand-cream/80">
                    Your enquiry has been submitted. Our team will get back to you on WhatsApp / Email within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-full text-xs font-bold text-brand-dark bg-gold-gradient"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-brand-cream/60 font-semibold block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-gold/30 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-brand-cream/60 font-semibold block">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-gold/30 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                        placeholder="10 digit mobile"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-brand-cream/60 font-semibold block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-gold/30 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                      placeholder="yourname@gmail.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-brand-cream/60 font-semibold block">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-gold/30 text-xs text-brand-cream focus:outline-none focus:border-brand-gold cursor-pointer"
                    >
                      <option value="Corporate Gifting">Festive & Corporate Gifting</option>
                      <option value="Wholesale Inquiry">Wholesale & Distributorship</option>
                      <option value="Order Query">Order Status Query</option>
                      <option value="Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-brand-cream/60 font-semibold block">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-gold/30 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                      placeholder="Tell us about your requirements or jar quantities..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-brand-dark bg-gold-gradient shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-transform transform hover:scale-102"
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
    </div>
  );
};
