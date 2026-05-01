import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

import {
  CONTACT_INFO,
  NAV_LINKS,
  SITE_METADATA,
  SOCIAL_MEDIA,
} from '@/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-beige-dark text-text-dark py-12 border-t border-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-wider text-text-dark"
            >
              {SITE_METADATA.brandName.toUpperCase()}
            </Link>
            <p className="mt-4 text-text-light text-sm max-w-sm">
              {SITE_METADATA.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-text-dark">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-light hover:text-pink transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-text-dark">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-text-light hover:text-pink transition-colors text-sm"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-text-light hover:text-pink transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <div className="flex space-x-4 mt-4">
                  <a
                    href={SOCIAL_MEDIA.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light hover:text-pink transition-colors"
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
                    href={CONTACT_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light hover:text-pink transition-colors"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-beige mt-8 pt-8 text-center">
          <p className="text-text-light text-sm">
            © {new Date().getFullYear()} {SITE_METADATA.brandName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
