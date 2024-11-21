import React from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type DocBreadcrumbsType from '@theme/DocBreadcrumbs';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { normalizePath } from '@site/src/utils/normalizePath';

type Props = WrapperProps<typeof DocBreadcrumbsType>;

//NOTE: Hides Breadcrumb 'home icon' on specific paths, such as "/job-definition-standalone"
export default function DocBreadcrumbsWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hideBreadcrumbsPath = '/job-definition-standalone';

  const shouldHideBreadCrumbs = normalizePath(hideBreadcrumbsPath) === normalizePath(location.pathname);
  
  return (
    <div style={{ display: shouldHideBreadCrumbs ? 'none' : 'block' }}>
      <DocBreadcrumbs {...props} />
    </div>
  );
}
