import Typography from '@mui/material/Typography';

import { LinkStyled } from './LinkStyled';

export const Copyright = ({ ...props }) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <LinkStyled color="inherit" to="/">
        J1Support
      </LinkStyled>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
