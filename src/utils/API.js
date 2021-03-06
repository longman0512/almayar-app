import Axios from 'axios';

export async function getProfileInfo(user) {
  var data = new FormData();
  data.append('api_key', ' admin@1474?');
  data.append('user_id', user);

  const DATA = await Axios({
    method: 'post',
    url: 'getProfileInfo',
    data,
    validateStatus: (status) => {
      return true;
    },
  }).then((res) => {
    return res.data;
  }).catch(error =>{
    console.log(error)
  });
  return DATA;
}

export async function toggleLike(user, pro_id) {
  var data = new FormData();
  data.append('api_key', ' admin@1474?');
  data.append('user_id', user);
  data.append('pro_id', pro_id);

  const DATA = await Axios({
    method: 'post',
    url: 'toggleLike',
    data,
    validateStatus: (status) => {
      return true;
    },
  }).then((res) => {
    return res.data;
  }).catch(error =>{
    console.log(error)
  });
  return DATA;
}

export async function getProDetail(pro_id) {
  var data = new FormData();
  data.append('api_key', ' admin@1474?');
  data.append('pro_id', pro_id);

  const DATA = await Axios({
    method: 'post',
    url: 'getProDetail',
    data,
    validateStatus: (status) => {
      return true;
    },
  }).then((res) => {
    return res.data;
  }).catch(error =>{
    console.log(error)
  });
  return DATA;
}
