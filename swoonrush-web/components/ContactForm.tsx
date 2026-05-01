'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-beige">
      <h3 className="text-2xl font-display font-bold text-text-dark mb-6">
        Send an Inquiry
      </h3>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-800 p-4 rounded-xl text-center"
        >
          <p className="font-medium">Thanks for reaching out!</p>
          <p className="text-sm mt-1">
            We&apos;ll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 text-sm font-medium text-green-700 underline"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-dark mb-1"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-beige-dark bg-beige-light focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-dark mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-beige-dark bg-beige-light focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="product"
              className="block text-sm font-medium text-text-dark mb-1"
            >
              Product Interested In (Optional)
            </label>
            <input
              type="text"
              id="product"
              className="w-full px-4 py-3 rounded-xl border border-beige-dark bg-beige-light focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent transition-all"
              placeholder="e.g. Crash Landing Comfort Tee"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-text-dark mb-1"
            >
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-beige-dark bg-beige-light focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent transition-all resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-pink hover:bg-pink-dark text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
