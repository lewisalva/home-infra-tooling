import Link from '@mui/material/Link';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

export const LinkStyled = (props: LinkProps) => {
  return <Link component={RouterLink} {...props} />;
};
