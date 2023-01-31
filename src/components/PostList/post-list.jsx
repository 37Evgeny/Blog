import { Grid } from "@mui/material";
import Post from '../Post/post.jsx'

const PostList = ({posts}) => {

    let postAll=posts;
    return (
        <>
            <Grid container spacing={2}>
                {
                    postAll.map((item) => <Post key={item._id} {...item} />)
                }
            </Grid>
        </>
    );
};

export default PostList;