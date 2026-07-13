// input handleChange handleSubmit 
// messages  
// mockjs /api/chat 流式输出
// chat 业务 
import {
  useChat
} from '@ai-sdk/react';

export const useChatbot = () => {
  return useChat({
    api: '/api/ai/chat',
    //  api: 'http://localhost:3000/api/ai/chat',
    onError: (err) => {
      console.error("Chat Error:", err);
    }
  })
}
