import React, { useEffect } from 'react';
import "../theme/cookieconsent.css"
import "../theme/cookieconsent.js"

const Root = ({ children }) => {
  useEffect(() => {
    if (typeof initCookieConsent !== 'undefined') {
      const cc = initCookieConsent();
      cc.run({
        current_lang: 'en',
        autoclear_cookies: true,
        page_scripts: true,
        onFirstAction: function (user_preferences, cookie) {
          console.log('First action:', user_preferences);
        },
        onAccept: function (cookie) {
          console.log('Accept cookies:', cookie);
        },
        onChange: function (cookie, changed_categories) {
          console.log('Changed categories:', changed_categories);
        },
        languages: {
          en: {
            consent_modal: {
              title: 'We use cookies!',
              description: 'This site uses cookies to enhance your experience.',
              primary_btn: {
                text: 'Accept all',
                role: 'accept_all',
              },
              secondary_btn: {
                text: 'Reject all',
                role: 'accept_necessary',
              },
            },
            settings_modal: {
              title: 'Cookie preferences',
              save_settings_btn: 'Save settings',
              accept_all_btn: 'Accept all',
              reject_all_btn: 'Reject all',
              close_btn_label: 'Close',
              cookie_table_headers: [
                { col1: 'Name' },
                { col2: 'Domain' },
                { col3: 'Expiration' },
                { col4: 'Description' },
              ],
              blocks: [
                {
                  title: 'Cookie usage',
                  description:
                    'This site uses cookies to improve functionality and performance.',
                },
                {
                  title: 'Strictly necessary cookies',
                  description: 'These cookies are essential for the website to function.',
                  toggle: {
                    value: 'necessary',
                    enabled: true,
                    readonly: true,
                  },
                },
                {
                  title: 'Analytics cookies',
                  description:
                    'These cookies help us understand website usage.',
                  toggle: {
                    value: 'analytics',
                    enabled: false,
                  },
                },
              ],
            },
          },
        },
      });
    }
  }, []);

  return <>{children}</>;
};

export default Root;