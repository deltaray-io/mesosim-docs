import React, { useState } from 'react';
import AnnouncementBar from '@theme-original/AnnouncementBar';
import type AnnouncementBarType from '@theme/AnnouncementBar';
import type { WrapperProps } from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { normalizePath } from '@site/src/utils/normalizePath';

type Props = WrapperProps<typeof AnnouncementBarType>;

export default function AnnouncementBarWrapper(props: Props): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  const customBannerPath = '/job-definition-standalone'; 
  const shouldHideBaseBanner = normalizePath(customBannerPath) === normalizePath(location.pathname);

  if (shouldHideBaseBanner && isVisible) {
    return (
      <div
        style={{
          backgroundColor: '#fef3c7',
          color: '#000',
          padding: '5px 25px 5px 5px',
          textAlign: 'center',
          fontSize: 14,
          zIndex: 1,
        }}
      >
        📄 This is the Job Definition Reference section of the documentation. Check out the{' '}
        <a
          href="https://docs.mesosim.io/"
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#2563eb', textDecoration: 'underline' }}
        >
          full Docs here
        </a>
        .
        <button
          onClick={() => setIsVisible(false)}
          style={{
            position: 'absolute',
            right: '10px',
            top: '5px',
            background: 'none',
            border: 'none',
            color: '#000',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          aria-label="Close banner"
        >
          &times;
        </button>
      </div>
    );
  }

  if (isVisible) {
    return <AnnouncementBar {...props} />;
  }

  return null;
}
