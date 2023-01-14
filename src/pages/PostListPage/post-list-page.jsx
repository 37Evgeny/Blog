import { Container } from "@mui/material";
import { useContext } from "react";
import PostList from "../../components/PostList/post-list";
import { PostContext } from "../../context/postContext"


export const PostListPage =()=>{
    const {posts} = useContext(PostContext)
    return(
        <>
            <Container>
                <PostList posts = {posts} />
            </Container>
        </>
    )
}