'use client';

import React from 'react';
import { GoogleAnalytics } from 'nextjs-google-analytics';

const GAWrapper: React.FC = () => {
  return <GoogleAnalytics trackPageViews />;
};

export default GAWrapper;
