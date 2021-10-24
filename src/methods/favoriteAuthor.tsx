import axios from 'axios';

export default function favoriteAuthor(author:any, callBack:any) {
  const token = window.localStorage.getItem('jwt');
  if(!token) return;
  const method = author.following ? 'delete' : 'post';
  const username =  author.username;
  const config = {
    method: method,
    url: `http://localhost:3000/api/profiles/${username}/follow`,
    headers: { 
      'Authorization': `Token ${token}`
    }
  } as any;
  
  axios(config)
  .then((response:any) => {
    callBack(response.data.profile);
  })
  .catch((error) => {
    console.log(error);
  });
}