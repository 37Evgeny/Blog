import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { Avatar } from '@mui/material';

const Header = ({userMe, avatar, onUpdateUser}) =>{

  const handleClickButtonEdit=(e)=>{
    e.preventDefault();
    onUpdateUser({name: 'Евгений', about:'Студент'})
  }
  
  return (
    
      <AppBar position="static" >
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Post
          </Typography>
          <Typography variant="h6">
            {userMe?.email && <span>{userMe?.email}</span> &&<span>{userMe?.name}</span>}
            
           <IconButton onClick={handleClickButtonEdit}>Изменить</IconButton>
          </Typography>
          
                    <Avatar aria-label="recipe">
                        {avatar}
                    </Avatar>
        </Toolbar>
        </AppBar>
  );
}

export default Header;