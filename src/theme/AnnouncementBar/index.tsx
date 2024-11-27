import React from 'react';
import AnnouncementBar from '@theme-original/AnnouncementBar';
import type AnnouncementBarType from '@theme/AnnouncementBar';
import type { WrapperProps } from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { normalizePath } from '@site/src/utils/normalizePath';

type Props = WrapperProps<typeof AnnouncementBarType>;

export default function AnnouncementBarWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hidebannerPath = '/job-definition-standalone';

  const shouldHideBanner = normalizePath(hidebannerPath) === normalizePath(location.pathname);

  return (
    <div style={{ display: shouldHideBanner ? 'none' : 'block' }}>
      <AnnouncementBar {...props} />
    </div>
  );
}
