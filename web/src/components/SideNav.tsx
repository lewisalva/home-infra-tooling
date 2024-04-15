import { Group } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Home from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from 'react-router-dom';

import { LinkUnstyled } from './LinkUnstyled';

export const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const SideNav = ({ open, toggleDrawer }: { open: boolean; toggleDrawer: () => void }) => {
  const { pathname } = useLocation();

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <LinkUnstyled to="/portal/organizations">
          <ListItemButton selected={pathname.endsWith('/portal/organizations')}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </LinkUnstyled>
        <LinkUnstyled to="/portal/organizations/members">
          <ListItemButton selected={pathname.endsWith('/portal/organizations/members')}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItemButton>
        </LinkUnstyled>
        <Divider sx={{ my: 1 }} />
        <LinkUnstyled to="/portal/signout">
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </LinkUnstyled>
      </List>
    </Drawer>
  );
};
