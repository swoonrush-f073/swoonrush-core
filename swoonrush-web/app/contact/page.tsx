import React from 'react';
import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import { CONTACT_PAGE_CONTENT } from '@/constants';

export const metadata: Metadata = {
  title: 'Contact Us | SwoonRush',
  description:
    'Get in touch with us to place an order or ask questions about our Drama inspired apparel.',
};

export default function ContactPage() {
  return (
    <div className="bg-beige min-h-screen py-16 pb-32 sm:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-3 sm:pt-0 mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-dark mb-4">
            {CONTACT_PAGE_CONTENT.header.title}
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            {CONTACT_PAGE_CONTENT.header.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-10 order-2 lg:order-1">
            <ContactInfo />

            <div className="bg-white p-6 rounded-2xl border border-beige-dark shadow-sm">
              <h3 className="font-semibold text-text-dark mb-2">
                {CONTACT_PAGE_CONTENT.howToOrder.title}
              </h3>
              <p className="text-text-light text-sm mb-4">
                {CONTACT_PAGE_CONTENT.howToOrder.description}
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
