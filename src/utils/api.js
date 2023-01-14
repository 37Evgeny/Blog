//Проверяет что вернул сервер
const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {

    constructor({baseUrl, headers}){
        this._headers= headers;
        this._baseUrl= baseUrl;
    }
// Запрос на получение всех постов
    getAllPosts(){
        return fetch(`${this._baseUrl}/posts`, {
            headers: this._headers
        }).then(onResponce)
    }

    // Запрос на получение информации о пользователе
    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(onResponce)
    }
      // Зaпрос на изменение пользовательских данных
      setUserInfo(dataUser){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(dataUser)
        }).then(onResponce)
    }
//  Запрос на получение всех пользователей
    getUserInfoAll(){
        return fetch(`${this._baseUrl}/users`, {
            headers: this._headers
        }).then(onResponce)
    }

    // Установка удаление лайkа
    changeLikePost(postId, isLike) {
        return fetch(`${this._baseUrl}/posts/likes/${postId}`,{
            method: isLike? "DELETE" : "PUT",
            headers: this._headers 
        } ).then(onResponce)
        // .catch((err) => { console.log(`ошибка ${err}`) })
    }
    // Запрос на удаление поста
    deletePost(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`,{
            method: "DELETE",
            headers: this._headers 
        } ).then(onResponce)
        .catch((err) => { console.log(`ошибка ${err}`) })
    }
  

}

    const config={
        baseUrl: 'https://api.react-learning.ru/v2/group-7',
        headers: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNzU5Yjk4YjAzOGY3NzlkMjYiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NTAsImV4cCI6MTY5OTQ0Nzk1MH0.FbGFQ-c9pHxlKBGHv9XIAypceFKUcPAMc7WYbXfIkt8',
          'Content-Type': 'application/json'
        },
      };

      const api= new Api(config)

export default api;