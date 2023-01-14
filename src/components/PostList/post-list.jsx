import { Container, Grid } from "@mui/material";
import Post from '../Post/post.jsx'

const PostList =({postsAll, onPostLike, userMe, postDelete}) => {
    return(
        <Grid container spacing={2}>
        {
           postsAll.map((item, index)=> <Post key={item._id} {...item} userMe={userMe} onPostLike={onPostLike} postDelete={postDelete}/> )
      }
        </Grid>
    );
};

export default PostList;