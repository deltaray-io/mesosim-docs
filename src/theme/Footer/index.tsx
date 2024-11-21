import React from 'react';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { normalizePath } from '@site/src/utils/normalizePath';

type Props = WrapperProps<typeof FooterType>;

//NOTE: Hides the Footer on specific paths, such as "/job-definition-standalone"
export default function FooterWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hideFooterPath = '/job-definition-standalone';

  const shouldHideFooter = normalizePath(hideFooterPath) === normalizePath(location.pathname);
  
  return (
    <div style={{ display: shouldHideFooter ? 'none' : 'block' }}>
      <Footer {...props} />
    </div>
  );
}
