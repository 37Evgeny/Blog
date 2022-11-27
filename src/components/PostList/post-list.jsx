import { Container, Grid } from "@mui/material";
import Post from '../Post/post.jsx'

const PostList =({posts}) => {
    return(
        <Grid container spacing={2}>
        {posts.map(item=> (
            <Post key={item._id} {...item}/>
        ))}
        </Grid>
    );
};

export default PostList;