import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import './index.css';

const Header = ({userMe, avatar, onUpdateUser}) =>{

  // const handleClickButtonEdit=(e)=>{
  //   e.preventDefault();
  //   onUpdateUser({name: 'Евгений', about:'Студент'})
  // }
  
  return (
    
      <AppBar position="static" >
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProjectPost
          </Typography>
          <Typography variant="h6">
            {userMe?.email && <span>{userMe?.email}</span> &&<span>{userMe?.name}</span>}
            
           {/* <IconButton onClick={handleClickButtonEdit}>Изменить</IconButton> */}
          </Typography>
          
                    <Avatar className='avatar' aria-label="recipe">
                        {avatar}
                    </Avatar>
        </Toolbar>
        </AppBar>
  );
}

export default Header;