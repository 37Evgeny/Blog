import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import PostList from "../PostList/post-list";
import {isDel, isLiked} from '../../utils/post';
import { NotFound } from "../NotFound/not-found";
import {  Routes, Route, useNavigate } from 'react-router-dom';
import { PostListPage } from "../../pages/PostListPage/post-list-page";
import { UserContext } from '../../context/userContext';
import { PostContext } from '../../context/postContext';
import { NotFoundPage } from "../../pages/NotFoundPage/not-found-page";
import { PostDetail } from "../PostDetail/post-detail";
import { PostDetailPage } from "../../pages/PostDetailPage/post-detail-page";
import { useCallback } from "react";

function App () {
// Состояние для постов
    const [posts, setPosts] = useState([]);
// Для пользователя по переданому токену 
    const [userMe,setUserMe] = useState(null);
// Для всех пользователей
    const [userAll, setUserAll] = useState(null);
    
    const navigate = useNavigate()
// Получаем посты
    useEffect(() => {
    Promise.all([api.getAllPosts(), api.getUserInfo(), api.getUserInfoAll()])
        .then(([postData, userData, userAllData]) => {
            setUserMe(userData)
            setPosts(postData) 
            setUserAll(userAllData)
        })
        .catch(err=>console.log(err))
    },[setPosts])

    // Функция изменения пользовательских данных
  function handleUpdateUser(userUpdateData){
    // обновленый объект отправляется на сервер
    api.setUserInfo(userUpdateData)
    // сервер отвечает обновленым объектом
    .then((newUserData)=> {
      setUserMe(newUserData)
    })
  }
// Фунция установки лайка 
  const handlePostLike= useCallback((post)=>{
    const liked = isLiked(post.likes, userMe._id)
      return api.changeLikePost(post._id, liked)
    .then((updatePost)=>{
      // Перебирает массив 
      const newPosts = posts.map(postState=>{
          // Возвращает новый массив если был поставлен лайк или удален       
         return postState._id ===updatePost._id ? updatePost : postState;
      })
      setPosts(newPosts);
      return updatePost;
    })
  },[userMe, posts])

  // const handlePostDelete= useCallback((post)=>{
  //    return api.deletePost(post._id)
  //   .then((delPost)=>{
  //     // Перебирает массив 
  //     const newPosts = delete posts[delPost]
  //     setPosts(newPosts);
  //     return delPost;
  //   })
  // },[])

  function handlePostDelete(post){
    const postId = post._id
    api.deletePost(postId)
    .then((newPost)=>{
      // Перебирает массив 
      const newPosts = delete posts[postId]
      setPosts(newPosts);
      })
      }

  // const handlePostDelete = useCallback((post)=>{
  //   return api.deletePost(post._id)
  //   .then((updatePostList)=>{
  //     const newPosts=
  //   })
  // })

    return(
      <UserContext.Provider value={{user: userMe}}>
      <PostContext.Provider value={{posts, postDelete: handlePostDelete, handleLike: handlePostLike}}>
            <Header userMe={userMe} onUpdateUser={handleUpdateUser}/>
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
              </main>
            <Footer/>
        </PostContext.Provider>
    </UserContext.Provider>
    );
};

export default App;