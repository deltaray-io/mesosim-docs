import React from 'react';
import Paginator from '@theme-original/DocItem/Paginator';
import type PaginatorType from '@theme/DocItem/Paginator';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';

type Props = WrapperProps<typeof PaginatorType>;

export default function PaginatorWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const hidePaginatorPath = '/job-definition-standalone';

  const normalizePath = (path: string) => path.replace(/\/+$/, '');
  const shouldHidePaginator = normalizePath(hidePaginatorPath) === normalizePath(location.pathname);
  return (
    <div style={{ display: shouldHidePaginator ? 'none' : 'block' }}>
      <Paginator {...props} />
    </div>
  );
}
