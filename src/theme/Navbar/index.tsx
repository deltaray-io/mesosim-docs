import React from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { normalizePath } from '@site/src/utils/normalizePath';

type Props = WrapperProps<typeof NavbarType>;

//NOTE: Hides the Navbar on specific paths, such as "/job-definition-standalone"
export default function NavbarWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hideNavbarPath = '/job-definition-standalone';

  const shouldHideNavbar = normalizePath(hideNavbarPath) === normalizePath(location.pathname);
  
  return (
    <div style={{ display: shouldHideNavbar ? 'none' : 'block' }}>
      <Navbar {...props} />
    </div>
  );
}
