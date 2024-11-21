import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import type DocSidebarType from '@theme/DocSidebar';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { normalizePath } from '@site/src/utils/normalizePath';

type Props = WrapperProps<typeof DocSidebarType>;

//NOTE: Hides the Sidebar on specific paths, such as "/job-definition-standalone"
export default function DocSidebarWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hideSidebarPath = '/job-definition-standalone';

  const shouldHideSidebar = normalizePath(hideSidebarPath) === normalizePath(location.pathname);
  
  return (
    <div style={{ display: shouldHideSidebar ? 'none' : 'block' }}>
      <DocSidebar {...props} />
    </div>
  );
}
