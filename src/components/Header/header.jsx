import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton } from '@mui/material';
import './index.css';

const Header = ({userMe, name, avatar}) =>{

  // const handleClickButtonEdit=(e)=>{
  //   e.preventDefault();
  //   // onUpdateUser({name: "Евгений", about:"Студент"})
  // }
  // const handleClickButtonEdit=(e)=>{
  //   e.preventDefault();
  //   
  //   onUpdateUserAvatar({avatar: "https://tshirt-factory.com/images/detailed/49/angry-pitbull-T-shirt-clip-art-49034.jpg"})
  // }
  
  return (
    
      <AppBar position="static" >
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProjectPost
          </Typography>
          <Typography variant="h6">
            {userMe?.email && <span>{userMe?.email}</span> &&<span>{userMe?.name}</span>}
{/*             
           <IconButton onClick={handleClickButtonEdit}>Изменить</IconButton> */}
          </Typography>
          
                    {/* <Avatar src={userMe?.avatar && avatar}  aria-label="recipe"> */}
                    <Avatar className='avatar' aria-label="recipe">
                        {avatar}
                    </Avatar>
        </Toolbar>
        </AppBar>
  );
}

export default Header;