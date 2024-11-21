import React from 'react';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hideFooterPath = '/job-definition-standalone';

  const normalizePath = (path: string) => path.replace(/\/+$/, '');
  const shouldHideFooter = normalizePath(hideFooterPath) === normalizePath(location.pathname);
  return (
    <div style={{ display: shouldHideFooter ? 'none' : 'block' }}>
      <Footer {...props} />
    </div>
  );
}
