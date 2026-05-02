'use client';

import React from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { CONTACT_INFO, CONTACT_PAGE_CONTENT, SOCIAL_MEDIA } from '@/constants';
import { trackEvent } from '@/utils/analytics';

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-display font-bold text-text-dark mb-6">
          {CONTACT_PAGE_CONTENT.contactInfo.title}
        </h2>
        <div className="space-y-6">
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            onClick={() =>
              trackEvent('contact_phone_click', 'engagement', 'Contact Page')
            }
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
            onClick={() =>
              trackEvent('contact_email_click', 'engagement', 'Contact Page')
            }
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
            onClick={() =>
              trackEvent('social_click', 'engagement', 'Instagram')
            }
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
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href={CONTACT_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('social_click', 'engagement', 'WhatsApp')}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-pink hover:text-white text-pink transition-all"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
