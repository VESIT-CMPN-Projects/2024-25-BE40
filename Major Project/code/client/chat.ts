import { ChatMessage } from '../types';
import axios from "axios"
import { env } from '../config';

export const sendMessage = async (message: string): Promise<ChatMessage> => {
  const { data } = await axios.post(
    `${env.backend_api}/chat`,
    { prompt: message },
    { withCredentials: true }
  )
    .catch(err => err)
    
  return {
    id: Date.now().toString(),
    content: data.msg,
    sender: 'bot',
    timestamp: new Date().toISOString()
  };
};
