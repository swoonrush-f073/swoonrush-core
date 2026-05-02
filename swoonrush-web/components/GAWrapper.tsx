'use client';

import React from 'react';
import { GoogleAnalytics } from 'nextjs-google-analytics';

const GAWrapper: React.FC = () => {
  return (
    <GoogleAnalytics
      trackPageViews
      gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
    />
  );
};

export default GAWrapper;
