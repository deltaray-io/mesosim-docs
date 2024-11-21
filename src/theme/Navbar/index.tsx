import React from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hideNavbarPath = '/no-navbar-job-definition-reference';

  const shouldHideNavbar = hideNavbarPath == location.pathname;

  return (
    <div style={{ display: shouldHideNavbar ? 'none' : 'block' }}>
      <Navbar {...props} />
    </div>
  );
}
