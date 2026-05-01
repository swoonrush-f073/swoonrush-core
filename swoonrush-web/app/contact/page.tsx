import React from 'react';
import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import ContactForm from '@/components/ContactForm';
import { CONTACT_INFO, CONTACT_PAGE_CONTENT, SOCIAL_MEDIA } from '@/constants';

export const metadata: Metadata = {
  title: 'Contact Us | SwoonRush',
  description:
    'Get in touch with us to place an order or ask questions about our Drama inspired apparel.',
};

export default function ContactPage() {
  return (
    <div className="bg-beige min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
            <div>
              <h2 className="text-2xl font-display font-bold text-text-dark mb-6">
                {CONTACT_PAGE_CONTENT.contactInfo.title}
              </h2>
              <div className="space-y-6">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-start gap-4 text-text-dark hover:text-pink transition-colors group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <Phone size={20} className="text-pink" />
                  </div>
                  <div>
                    <p className="text-sm text-text-light">
                      {CONTACT_PAGE_CONTENT.contactInfo.phoneLabel}
                    </p>
                    <p className="font-medium text-md">{CONTACT_INFO.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-4 text-text-dark hover:text-pink transition-colors group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <Mail size={20} className="text-pink" />
                  </div>
                  <div>
                    <p className="text-sm text-text-light">
                      {CONTACT_PAGE_CONTENT.contactInfo.emailLabel}
                    </p>
                    <p className="font-medium text-md">{CONTACT_INFO.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 text-text-dark">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <MapPin size={20} className="text-pink" />
                  </div>
                  <div>
                    <p className="text-sm text-text-light">
                      {CONTACT_PAGE_CONTENT.contactInfo.addressLabel}
                    </p>
                    <p className="font-medium text-md">
                      {CONTACT_INFO.address.line1}
                      <br />
                      {CONTACT_INFO.address.line2}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-dark mb-6">
                {CONTACT_PAGE_CONTENT.connectWithUs.title}
              </h2>
              <div className="flex gap-4">
                <a
                  href={SOCIAL_MEDIA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-pink hover:text-white text-pink transition-all"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href={SOCIAL_MEDIA.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-pink hover:text-white text-pink transition-all"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href={CONTACT_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-pink hover:text-white text-pink transition-all"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

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
