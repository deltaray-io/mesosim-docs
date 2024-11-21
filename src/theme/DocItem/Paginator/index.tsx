import React from 'react';
import Paginator from '@theme-original/DocItem/Paginator';
import type PaginatorType from '@theme/DocItem/Paginator';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { normalizePath } from '@site/src/utils/normalizePath';

type Props = WrapperProps<typeof PaginatorType>;

//NOTE: Hides the Paginator on specific paths, such as "/job-definition-standalone"
export default function PaginatorWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hidePaginatorPath = '/job-definition-standalone';

  const shouldHidePaginator = normalizePath(hidePaginatorPath) === normalizePath(location.pathname);

  return (
    <div style={{ display: shouldHidePaginator ? 'none' : 'block' }}>
      <Paginator {...props} />
    </div>
  );
}
