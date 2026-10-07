import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  onNavigate?: (path: string) => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const phoneTrimmed = formData.phone.trim();
    const messageTrimmed = formData.message.trim();

    // Name Validation
    const nameRegex = /^[a-zA-Z\s'-]{2,60}$/;
    if (!nameTrimmed) {
      newErrors.name = 'Full name is required.';
    } else if (!nameRegex.test(nameTrimmed)) {
      newErrors.name = 'Please enter a valid name (letters and spaces only).';
    }

    // Phone / WhatsApp Validation
    const phoneClean = phoneTrimmed.replace(/[\s\-\(\)\+]/g, '');
    const phoneRegex = /^[0-9]{7,15}$/;
    const isFakePhone = /^(\d)\1{9,}$/.test(phoneClean) || phoneClean === '1234567890';
    if (!phoneTrimmed) {
      newErrors.phone = 'Phone / WhatsApp number is required.';
    } else if (!phoneRegex.test(phoneClean) || isFakePhone) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailTrimmed) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Message Validation
    if (!messageTrimmed) {
      newErrors.message = 'Message is required.';
    } else if (messageTrimmed.length < 10) {
      newErrors.message = 'Please provide a little more detail (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="pt-8 pb-10 sm:pt-10 sm:pb-16 bg-brand-dark text-brand-cream relative overflow-hidden select-none border-t border-brand-gold/15">

      {/* Ambient Background & Texture */}
      <div className="absolute inset-0 opacity-10 bg-dark-paper pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-9 lg:gap-12">

        {/* Business Enquiry Form */}
        <div className="w-full max-w-3xl lg:max-w-none lg:flex-1">
          <div className="p-7 sm:p-12 rounded-3xl bg-brand-espresso/50 border border-brand-gold/20 shadow-2xl backdrop-blur-md">

            <div className="mb-6 sm:mb-8 space-y-2 text-center sm:text-left">
              <h3 className="font-serif text-4xl sm:text-5xl font-bold text-brand-cream tracking-tight">
                Send us a Message
              </h3>
              <p className="text-brand-cream/80 text-sm sm:text-base font-light leading-relaxed">
                Have a question about our dragées, corporate gifting, or wholesale orders? Fill in your details below.
              </p>
            </div>

            {submitted ? (
              <div className="p-10 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">Thank You!</h4>
                <p className="text-base sm:text-lg text-brand-cream/80 max-w-md mx-auto font-light">
                  Your enquiry has been received. Our concierge team will reach out to you on WhatsApp / Email within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                    setErrors({});
                  }}
                  className="mt-4 px-10 py-3.5 rounded-full text-sm uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient hover:brightness-110 transition-all shadow-md cursor-pointer"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-7">

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-cream/90 font-semibold block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-xl bg-brand-dark/70 border text-sm sm:text-base text-brand-cream placeholder:text-brand-cream/30 focus:outline-none transition-all ${errors.name
                        ? 'border-rose-500/70 focus:border-rose-500 ring-1 ring-rose-500/30'
                        : 'border-brand-gold/25 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30'
                        }`}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-cream/90 font-semibold block">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-xl bg-brand-dark/70 border text-sm sm:text-base text-brand-cream placeholder:text-brand-cream/30 focus:outline-none transition-all ${errors.phone
                        ? 'border-rose-500/70 focus:border-rose-500 ring-1 ring-rose-500/30'
                        : 'border-brand-gold/25 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30'
                        }`}
                      placeholder="10 digit mobile number"
                    />
                    {errors.phone && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-cream/90 font-semibold block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-4 py-3.5 rounded-xl bg-brand-dark/70 border text-sm sm:text-base text-brand-cream placeholder:text-brand-cream/30 focus:outline-none transition-all ${errors.email
                      ? 'border-rose-500/70 focus:border-rose-500 ring-1 ring-rose-500/30'
                      : 'border-brand-gold/25 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30'
                      }`}
                    placeholder="yourname@gmail.com"
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-cream/90 font-semibold block">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`w-full px-4 py-3.5 rounded-xl bg-brand-dark/70 border text-sm sm:text-base text-brand-cream placeholder:text-brand-cream/30 focus:outline-none transition-all resize-none ${errors.message
                      ? 'border-rose-500/70 focus:border-rose-500 ring-1 ring-rose-500/30'
                      : 'border-brand-gold/25 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30'
                      }`}
                    placeholder="Tell us about your requirements or jar quantities..."
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-[72px] rounded-full text-sm sm:text-base uppercase tracking-[0.2em] font-bold text-brand-dark bg-gold-gradient shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer mt-4"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Enquiry</span>
                </button>

              </form>
            )}

          </div>
        </div>

        {/* 4 Contact Information Tiles */}
        <div className="w-full max-w-3xl lg:max-w-xs xl:max-w-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 shrink-0">

          {/* Phone / WhatsApp */}
          <a
            href="https://wa.me/918488971879"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-brand-espresso/50 border border-brand-gold/20 hover:bg-brand-roast/40 transition-all shadow-lg backdrop-blur-md group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0 shadow-md">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-widest text-brand-goldLight/80 font-bold block truncate">
                WhatsApp Line
              </span>
              <span className="font-mono text-xs text-brand-cream font-bold group-hover:text-emerald-300 transition-colors block truncate">
                +91 8488971879
              </span>
            </div>
          </a>

          {/* Instagram DM */}
          <a
            href="https://instagram.com/nuttybitez"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-brand-espresso/50 border border-brand-gold/20 hover:bg-brand-roast/40 transition-all shadow-lg backdrop-blur-md group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center text-brand-goldLight group-hover:scale-105 transition-transform shrink-0 shadow-md">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-widest text-brand-goldLight/80 font-bold block truncate">
                Instagram DM
              </span>
              <span className="text-xs font-semibold text-brand-cream group-hover:text-brand-goldLight transition-colors block truncate">
                @nuttybitez
              </span>
            </div>
          </a>

          {/* Email Enquiries */}
          <a
            href="mailto:hello@nuttybitez.com"
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-brand-espresso/50 border border-brand-gold/20 hover:bg-brand-roast/40 transition-all shadow-lg backdrop-blur-md group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center text-brand-goldLight group-hover:scale-105 transition-transform shrink-0 shadow-md">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-widest text-brand-goldLight/80 font-bold block truncate">
                Email Concierge
              </span>
              <span className="text-xs font-semibold text-brand-cream group-hover:text-brand-goldLight transition-colors block truncate">
                hello@nuttybitez.com
              </span>
            </div>
          </a>

          {/* Brand Origin & Location */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-brand-espresso/50 border border-brand-gold/20 shadow-lg backdrop-blur-md">
            <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center text-brand-goldLight shrink-0 shadow-md">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-widest text-brand-goldLight/80 font-bold block truncate">
                Artisanal Kitchen
              </span>
              <span className="text-xs text-brand-cream/80 font-light leading-snug block truncate">
                Handcrafted in India
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
