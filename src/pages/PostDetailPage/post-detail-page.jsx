import { useCallback } from "react"
import api from "../../utils/api"
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PostDetail } from "../../components/PostDetail/post-detail";
import { PostContext } from "../../context/postContext";
import { useApi } from "../../hooks/useApi";
import { isLiked } from "../../utils/post"

export const PostDetailPage = () => {

  const {postId} = useParams()
  const {handleLike} = useContext(PostContext);
  const handleGetPost = useCallback (()=> api.getPostById(postId), [postId]);

  const {
    data: post,
    setData: setPost,
    error: errorState
  } =useApi(handleGetPost)

  // Фунkция установки лайка 
  const handlePostLike = useCallback(()=>{
    handleLike(post)
    .then((updatePost)=>{
      console.log(updatePost)
      setPost(updatePost);
    })
  },[post, handleLike, setPost]) 


    return (
        <>
             <PostDetail {...post} setPost={setPost} onPostLike={handlePostLike}/>
        </>
    )
}