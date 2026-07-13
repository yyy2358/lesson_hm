import axios from './config';

export const ask = async (question: string) => {
  // sdd 
  const res = await axios.post('/ai/rag', { question });
  console.log(res);
  return res.answer;
}
