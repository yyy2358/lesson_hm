import axios from './config';

export const doSearch = (keyword: string) => {
  return axios.get(`/ai/search?keyword=${keyword}`);
  // return axios.get(`/search?keyword=${keyword}`);
}