import { event } from 'nextjs-google-analytics';

/**
 * Log a custom event to Google Analytics
 * @param action The name of the event (e.g., 'click_button')
 * @param category The category of the event (e.g., 'interaction')
 * @param label The label of the event (e.g., 'Hero Button')
 * @param value The value of the event (optional)
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  event(action, {
    category,
    label,
    value,
  });
};
