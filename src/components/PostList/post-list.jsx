import { Container, Grid } from "@mui/material";
import Post from '../Post/post.jsx'
import { useContext } from 'react';
import { PostContext } from '../../context/postContext';
import { UserContext } from '../../context/userContext';

const PostList =({posts}) => {
     return(
        <Grid container spacing={2}>
        {
           posts.map((item)=> <Post key={item._id} {...item}/> )
      }
        </Grid>
    );
};

export default PostList;