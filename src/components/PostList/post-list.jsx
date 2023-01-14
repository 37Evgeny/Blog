import { Container, Grid } from "@mui/material";
import Post from '../Post/post.jsx'

const PostList =({postsAll, onPostLike, userMe}) => {
    return(
        <Grid container spacing={2}>
        {
           postsAll.map((item, index)=> <Post key={item._id} {...item} userMe={userMe} onPostLike={onPostLike}/> )
      }
        </Grid>
    );
};

export default PostList;