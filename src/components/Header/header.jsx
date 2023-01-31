import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import './index.css';
import { ButtonAddPost } from '../ButtonAddPost/button-add-post';

const Header = ({ userMe }) => {

  return (
    <AppBar position="static" >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ProjectPost
        </Typography>
        <ButtonAddPost />
        <Typography variant="h6">
          {<span>{userMe?.name}</span>}
        </Typography>
        <Avatar className='avatar' src={userMe?.avatar && userMe?.avatar} aria-label="recipe">
          {userMe?.name.slice(0, 1).toUpperCase()}
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default Header;