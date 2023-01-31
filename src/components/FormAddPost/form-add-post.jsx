import { useForm } from "react-hook-form";
import api from "../../utils/api";
import "./index.css";

export const FormAddPost= ({userMe,setPosts, posts})=> {

      const { register, handleSubmit } = useForm({ mode: 'onBlur'});

      const onSubmit = (data) =>{
        data.tags = []
        api.setAddPost(data)
          console.log(data);
        }
      

      const textTitle= register('title',{
        required:{
          value:true,
          
        }
      })
      const textText= register('text',{
        required:{
          value:true,
         
        }
      })
      const textImg= register('image',{
        required:{
          value:true,
          
        }
      })
      const textTags= register('[tags]',{
        required:{
          value:true,
         
        }
      })
      

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input  {...textTitle}
                id="title"
                typeinput="text"
                placeholder='Введите заголовок'
            />
            <input  {...textText}
                id="text"
                typeinput="textarea"
                placeholder='Введите описание'
            />
            <input  {...textImg}
                id="image"
                typeinput="text"
                placeholder='Введите ссылку на изображение'
            />
            <input  {...textTags}
                id="tags"
                typeinput="text"
                placeholder='Введите теги'
            />
          <input  type="submit"/>
        </form>
      );
    }