'use client';

import { CONTACT_INFO, HOME_PAGE_CONTENT } from '@/constants';
import { trackEvent } from '@/utils/analytics';

export default function CtaSection() {
  return (
    <section className="py-20 pb-36 sm:pb-20 bg-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-dark mb-6">
          {HOME_PAGE_CONTENT.ctaSection.title}
        </h2>
        <p className="text-text-light text-lg mb-10 max-w-2xl mx-auto">
          {HOME_PAGE_CONTENT.ctaSection.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(HOME_PAGE_CONTENT.ctaSection.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', 'conversion', 'CTA Section')}
            className="inline-flex items-center justify-center gap-2 bg-pink hover:bg-pink-dark text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {HOME_PAGE_CONTENT.ctaSection.whatsappBtn}
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-text-dark border-2 border-transparent hover:border-pink px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {HOME_PAGE_CONTENT.ctaSection.contactFormBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
