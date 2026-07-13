import axios from './config';
import type { Post } from '@/types';

export const fetchPosts = async (page:number = 1, 
  limit:number=10) => {
    try {
      const response = await axios.get('/posts', {
        params: {
          page,
          limit
        }
      })
      console.log(response);
      return response;
    } catch(err) {

    }
}
// 发表文章
export const createPosts = async () => {
  return axios.post('/posts', {
    title:'1212121212',
    content: '22ssdffccccc'
  })
}