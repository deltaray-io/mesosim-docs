import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import type DocSidebarType from '@theme/DocSidebar';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';

type Props = WrapperProps<typeof DocSidebarType>;

export default function DocSidebarWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hideSidebarPath = '/job-definition-standalone';

  const shouldHideSidebar = hideSidebarPath == location.pathname;

  return (
    <div style={{ display: shouldHideSidebar ? 'none' : 'block' }}>
      <DocSidebar {...props} />
    </div>
  );
}
