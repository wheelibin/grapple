import axios from "axios";

const get = url => {
  return axios.get(url);
};

const post = (url, data) => {
  return axios.post(url, data);
};

export default { get, post };
