import axios from 'axios';

export default function favoriteArticle(article:any, callBack:any) {
  const token = window.localStorage.getItem('jwt');
  if(!token) return;
  const data = '';
  const method = article.favorited ? 'delete' : 'post';
  const config = {
    method: method,
    url: `http://localhost:3000/api/articles/${article.slug}/favorite`,
    headers: { 
      'Authorization': `Token ${token}`
    },
    data : data
  } as any;
  axios(config)
  .then((response:any) => {
    callBack(response.data.article)
  })
  .catch((error) => {
    console.log(error);
  });
}