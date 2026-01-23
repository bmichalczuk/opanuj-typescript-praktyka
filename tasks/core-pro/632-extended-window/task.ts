/* Rozszerz interfejs globalnego obiektu window o obiekt analytics z metodę trackEvent(string): void.
  Zrób to w sposób globalny, który będzie dostępny w całym projekcie, za pomocą dedykowanego pliku.
*/
declare global {
  interface Window {
    analytics: {
      trackEvent: (eventName: string) => void;
    };
  }
}
window.analytics.trackEvent('click');
