import { Container } from "@mui/material";
import Header from "../Header/header";
import PostList from "../PostList/post-list";
import {postData} from "./posts";

const App =() => {
    return(
        <>
            <Header/>
            <Container>
                <PostList posts = {postData}/>
            </Container>
        </>
    );
};

export default App;