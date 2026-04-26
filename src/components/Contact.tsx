import React, { useState } from 'react';
import Reveal from './Reveal';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    challenge: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      }

      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: form.name,
          business: form.business,
          email: form.email,
          phone: form.phone || null,
          challenge: form.challenge,
          message: form.message || null,
          source_page: 'homepage',
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
      setForm({
        name: '',
        business: '',
        email: '',
        phone: '',
        challenge: '',
        message: '',
      });
    } catch (error) {
      setSubmitError('Could not send your request right now. Please try again in a moment.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-[13px] text-[#F5F5F5] font-["DM_Sans"] text-[15px] outline-none focus:border-[#FF1B1B] focus:shadow-[0_0_0_3px_rgba(255,27,27,0.1)] transition-all duration-200';

  const labelClass =
    'block text-xs font-["JetBrains_Mono"] tracking-[1.5px] uppercase text-[#6B6B6B] mb-2';

  return (
    <section id="contact" className="py-24 bg-[#030303]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Info */}
          <div>
            <Reveal>
              <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
                GET IN TOUCH
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-['Playfair_Display'] mb-5" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                Let's Build Something Together.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-[#A8A8A8] text-base leading-[1.8] mb-9">
                Whether you're a local vendor, a growing D2C brand, or a business tired of being invisible
                — Prothsahan is built for you. Drop us a message and we'll get back within 24 hours.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    content: (
                      <a href="mailto:prothsahan.counsulting@gmail.com" className="text-[#A8A8A8] no-underline hover:text-[#FF1B1B] transition-colors cursor-none">
                        prothsahan.counsulting@gmail.com
                      </a>
                    ),
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="5"/>
                        <circle cx="12" cy="12" r="5"/>
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                      </svg>
                    ),
                    content: (
                      <a href="https://www.instagram.com/prothsahan.co/" target="_blank" rel="noopener" className="text-[#A8A8A8] no-underline hover:text-[#FF1B1B] transition-colors cursor-none">
                        @prothsahan.co
                      </a>
                    ),
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    content: <span className="text-[#A8A8A8]">Anand, Gujarat, India</span>,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center text-sm text-[#A8A8A8]">
                    <span className="text-[#FF1B1B] flex-shrink-0">{item.icon}</span>
                    {item.content}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={2}>
            <div className="bg-[#1A1A1A] border border-white/[0.07] rounded-2xl p-10">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className={labelClass}>Your Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Business Name</label>
                      <input
                        type="text"
                        name="business"
                        placeholder="Business Name"
                        required
                        value={form.business}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone (optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Biggest Challenge</label>
                    <select
                      name="challenge"
                      required
                      value={form.challenge}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none`}
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <option value="" disabled>Select your challenge</option>
                      <option value="sales">Low sales / revenue stagnation</option>
                      <option value="visibility">Poor brand visibility</option>
                      <option value="ads">Ads not converting</option>
                      <option value="positioning">Unclear brand positioning</option>
                      <option value="strategy">Need complete growth strategy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Tell Us More</label>
                    <textarea
                      name="message"
                      placeholder="Tell us more about your business..."
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputClass} resize-y min-h-[100px]`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#FF1B1B] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-full text-base font-medium mt-2 hover:scale-[1.02] transition-transform duration-200 shadow-[0_0_20px_rgba(255,27,27,0.4)] cursor-none"
                  >
                    {isSubmitting ? 'Sending...' : 'Send My Growth Request'}
                  </button>

                  {submitError && (
                    <p className="text-[#ff8c8c] text-sm mt-3 text-center">{submitError}</p>
                  )}
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[rgba(255,27,27,0.15)] border-2 border-[#FF1B1B] flex items-center justify-center mx-auto mb-4 text-[24px] text-[#FF1B1B]">
                    ✓
                  </div>
                  <h3 className="font-['Playfair_Display'] text-2xl mb-2">Message Received!</h3>
                  <p className="text-[#A8A8A8]">We've got your message. Expect a reply within 24 hours.</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
