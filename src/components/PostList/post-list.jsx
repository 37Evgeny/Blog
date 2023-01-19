import { Container, Grid } from "@mui/material";
import Post from '../Post/post.jsx'
import { useContext } from 'react';
import { PostContext } from '../../context/postContext';
import { UserContext } from '../../context/userContext';
import { useNavigate } from "react-router-dom";

const PostList =({posts}) => {
    const navigate= useNavigate()
     return(
        <Grid container spacing={2}>
        {
           posts.map((item)=> <Post key={item._id} {...item}/> )
      }
        </Grid>
    );
};

export default PostList;