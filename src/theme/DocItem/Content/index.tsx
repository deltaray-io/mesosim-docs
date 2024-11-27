import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type {WrapperProps} from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { normalizePath } from '@site/src/utils/normalizePath';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): JSX.Element {
  const location = useLocation();

  const addMarginPath = '/job-definition-standalone';

  const shouldAddMargin = normalizePath(addMarginPath) === normalizePath(location.pathname);

  return (
    <div style={shouldAddMargin ? { marginTop: '-20px' } : { marginTop: '' }}>
      <Content {...props} />
    </div>
  );
}
