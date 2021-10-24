import axios from 'axios';

export default function updateLogin(oldToken:any, callBack:any) {
  if(!oldToken) return;
  const config = {
    method: 'get',
    url: 'http://localhost:3000/api/user',
    headers: { 
      'Authorization': `Token ${oldToken}`
    }
  } as any;

  axios(config)
  .then((response:any) => {
    window.localStorage.setItem('jwt', response.data.user.token);
    window.localStorage.setItem('userName', response.data.user.username);
    callBack(response.data.user)
  })
  .catch((error) => {
    console.log(error);
  });
} 