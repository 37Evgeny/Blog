import { useEffect, useState } from "react";
import api from "../../utils/api";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import { isLiked } from '../../utils/post';
import {  Routes, Route } from 'react-router-dom';
import { PostListPage } from "../../pages/PostListPage/post-list-page";
import { UserContext } from '../../context/userContext';
import { PostContext } from '../../context/postContext';
import { NotFoundPage } from "../../pages/NotFoundPage/not-found-page";
import { PostDetailPage } from "../../pages/PostDetailPage/post-detail-page";
import { useCallback } from "react";
import { FormAddPost } from "../FormAddPost/form-add-post";

function App () {
    const [posts, setPosts] = useState([]);
    const [userMe,setUserMe] = useState(null);
    useEffect(() => {
    Promise.all([api.getAllPosts(), api.getUserInfo()])
        .then(([postData, userData]) => {
            setUserMe(userData)
            setPosts(postData) 
        })
        .catch(err=>console.log(err))
    },[])

  function handleUpdateUser(userUpdateData){
    api.setUserInfo(userUpdateData)
    .then((newUserData)=> {
      setUserMe(newUserData)
    })
  }

     function handleUpdateUserAvatar(userUpdateDataAvatar){
      api.setUserAvatar(userUpdateDataAvatar)
      .then((newUserDataAvatar)=> {
        setUserMe(newUserDataAvatar)
      })
    }

  const handlePostLike= useCallback((post)=>{
    const liked = isLiked(post.likes, userMe._id)
      return api.changeLikePost(post._id, liked)
    .then((updatePost)=>{
      const newPosts = posts.map(postState=>{   
         return postState._id === updatePost._id ? updatePost : postState;
      })
      setPosts(newPosts);
      return updatePost;
    })
  },[userMe, posts])

  function handlePostDelete(post){
    const postId = post._id
    api.deletePost(postId)
    let updatePosts=posts.filter((e)=>{return e._id !==postId})
    setPosts(updatePosts)
  }



    return(
      <UserContext.Provider value={{user: userMe}}>
      <PostContext.Provider value={{posts, handlePostDelete: handlePostDelete, handleLike: handlePostLike}}>
            <Header userMe={userMe} onUpdateUser={handleUpdateUser} onUpdateUserAvatar={handleUpdateUserAvatar}/>
            <main className='content container'>
              <Routes>
                  <Route index element={
                    <PostListPage/>
                  }/>
                   <Route path='*' element={
                    <NotFoundPage/>
                   }/>
                   <Route path='/post/:postId' element={
                    <PostDetailPage/>
                   }/>
              </Routes>
              <FormAddPost/>
              </main>
            <Footer/>
        </PostContext.Provider>
    </UserContext.Provider>
    );
};

export default App;