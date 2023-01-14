import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import PostList from "../PostList/post-list";
import {isLiked} from '../../utils/post';

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
            console.log(userData)
        })
        .catch(err=>console.log(err))
    },[])

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

    return(
        <>
            <Header userMe={userMe} onUpdateUser={handleUpdateUser}/>
            <Container>
                <PostList postsAll = {posts} onPostLike={handlePostLike} userMe={userMe} />
            </Container>
            <Footer/>
        </>
    );
};

export default App;