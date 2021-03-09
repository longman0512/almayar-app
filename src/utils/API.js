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

export async function getNextPageApi(pageNum) {
  var data = new FormData();
  data.append('api_key', ' admin@1474?');
  data.append('pageNum', pageNum);
  console.log(data)
  const DATA = await Axios({
    method: 'post',
    url: 'getNextPage',
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

export async function getCategories() {
  var data = new FormData();
  data.append('api_key', ' admin@1474?');
  console.log(data)
  const DATA = await Axios({
    method: 'post',
    url: 'getCategories',
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

export async function addProductApi(proData) {
  var data = new FormData();
  data.append('api_key', ' admin@1474?');
  data.append('category', proData.category);
  data.append('pro_name', proData.pro_name);
  data.append('pro_price', proData.pro_price);
  data.append('pro_description', proData.pro_description);
  data.append('pro_discount_type', proData.pro_discount_type);
  data.append('pro_discount_amount', proData.pro_discount_amount);
  data.append('user_id', proData.user_id);
  data.append('pro_type', proData.pro_media.mime.substring(0, 5));
  data.append('valid_from', proData.valid_from.toDateString());
  data.append('valid_to', proData.valid_to.toDateString());
  data.append('pro_media',
  {
      uri: proData.pro_media.path,
      name:'products',
      type: proData.pro_media.mime, 
  });
  console.log(data, "in api")

  const DATA = await Axios.post(
    "addProduct",
    data)
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err);
  });
  return ''
}
