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

function App () {
// Состояние для постов
    const [posts, setPosts] = useState([]);
// Для пользователя по переданому токену 
    const [userMe,setUserMe] = useState(null);
// Для всех пользователей
    // const [userAll, setUserAll] = useState(null);
    // // const [deletePosts, setDeletePost]=useState([]);
    
    // const navigate = useNavigate()
// Получаем посты
    useEffect(() => {
    Promise.all([api.getAllPosts(), api.getUserInfo(), api.getUserInfoAll()])
        .then(([postData, userData, userAllData]) => {
            setUserMe(userData)
            setPosts(postData) 
            // setUserAll(userAllData)
        })
        .catch(err=>console.log(err))
    },[])

    // Функция изменения пользовательских данных name && about
  function handleUpdateUser(userUpdateData){
    // обновленый объект отправляется на сервер
    api.setUserInfo(userUpdateData)
    // сервер отвечает обновленым объектом
    .then((newUserData)=> {
      setUserMe(newUserData)
    })
  }

     // Функция изменения пользовательских данных avatar
     function handleUpdateUserAvatar(userUpdateDataAvatar){
      // обновленый объект отправляется на сервер
      api.setUserAvatar(userUpdateDataAvatar)
      // сервер отвечает обновленым объектом
      .then((newUserDataAvatar)=> {
        setUserMe(newUserDataAvatar)
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
         return postState._id === updatePost._id ? updatePost : postState;
      })
      setPosts(newPosts);
      return updatePost;
    })
  },[userMe, posts])

  function handlePostDelete(post){
    const postId = post._id
    api.deletePost(postId)
  }


    return(
      <UserContext.Provider value={{user: userMe}}>
      <PostContext.Provider value={{posts, postDelete: handlePostDelete, handleLike: handlePostLike}}>
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
              </main>
            <Footer/>
        </PostContext.Provider>
    </UserContext.Provider>
    );
};

export default App;