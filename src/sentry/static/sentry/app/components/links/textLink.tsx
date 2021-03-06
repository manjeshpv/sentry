import {Link} from 'react-router';
import styled from '@emotion/styled';

/**
 * Link colored as normal text
 */
const TextLink = styled(Link)`
  color: ${p => p.theme.gray3};
  &:hover {
    color: ${p => p.theme.gray5};
  }
`;

export default TextLink;
