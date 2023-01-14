import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import PostList from "../PostList/post-list";
import {isLiked} from '../../utils/post';
import { NotFound } from "../NotFound/not-found";
import {  Routes, Route, useNavigate } from 'react-router-dom';
import { PostListPage } from "../../pages/PostListPage/post-list-page";
import { UserContext } from '../../context/userContext';
import { PostContext } from '../../context/postContext';

function App () {
// Состояние для постов
    const [posts, setPosts] = useState([]);
// Для пользователя по переданому токену 
    const [userMe,setUserMe] = useState(null);
// Для всех пользователей
    const [userAll, setUserAll] = useState(null);
// Получаем посты
    useEffect(() => {
    Promise.all([api.getAllPosts(), api.getUserInfo(), api.getUserInfoAll()])
        .then(([postData, userData, userAllData]) => {
            setUserMe(userData)
            setPosts(postData) 
            setUserAll(userAllData)
        })
        .catch(err=>console.log(err))
    },[posts])

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
  function handlePostLike(post){
    const liked = isLiked(post.likes, userMe._id)
    api.changeLikePost(post._id, liked)
    .then((newPost)=>{
      // Перебирает массив 
      const newPosts = posts.map(postState=>{
          // Возвращает новый массив если был поставлен лайк или удален       
         return postState._id ===newPost._id ? newPost : postState;
      })
      setPosts(newPosts);
    })
  }

  function handlePostDelete(post){
    api.deletePost(post._id)
    .then((newPost)=>{
      // Перебирает массив 
      const newPosts = posts.map(postState=>{       
         return postState._id ===newPost._id ? newPost : postState;
      })
      setPosts(newPosts);
    })
  }

    return(
      <UserContext.Provider value={{user: userMe}}>
      <PostContext.Provider value={{posts, postDelete: handlePostDelete, handleLike: handlePostLike}}>
        <>
            <Header userMe={userMe} onUpdateUser={handleUpdateUser}/>
              <Routes>
                  <Route index element={
                    <PostListPage/>
                  }/>
              </Routes>
            <Footer/>
        </>
        </PostContext.Provider>
    </UserContext.Provider>
    );
};

export default App;